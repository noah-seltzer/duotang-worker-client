import { useEffect, useRef, useState } from 'react'
import { combine, getToken } from '../../lib/onedrive'
import { useMsal } from '@azure/msal-react'
import type { IPublicClientApplication } from '@azure/msal-browser'
import {v4 as uuidv4} from 'uuid'

const channelId = uuidv4()

const options = {
    sdk: '8.0',
    entry: {
        oneDrive: {}
    },
    authentication: {},
    messaging: {
        origin: window.location.origin,
        channelId: channelId
    }
}

const baseUrl =
    import.meta.env.VITE_HORIZON_SHAREPOINT_URL || 'https://onedrive.live.com'

async function createOneDriveWindow(
    instance: IPublicClientApplication,
    iframeDocument: Document,
    onClose: (command: any) => void = () => {},
    onPick: (command: any) => Promise<void> = async () => {}
): Promise<void> {
    let port: MessagePort

    async function channelMessageListener(message: MessageEvent): Promise<void> {
    const payload = message.data;

    switch (payload.type) {

        case "notification":
            const notification = payload.data;

            if (notification.notification === "page-loaded") {
                // here we know that the picker page is loaded and ready for user interaction
            }

            console.log(message.data);
            break;

        case "command":

            // all commands must be acknowledged
            port.postMessage({
                type: "acknowledge",
                id: message.data.id,
            });

            // this is the actual command specific data from the message
            const command = payload.data;

            // command.command is the string name of the command
            switch (command.command) {

                case "authenticate":
                    // the first command to handle is authenticate. This command will be issued any time the picker requires a token
                    // 'getToken' represents a method that can take a command and return a valid auth token for the requested resource
                    try {
                        const token = await getToken(command, instance);

                        if (!token) {
                            throw new Error("Unable to obtain a token.");
                        }

                        // we report a result for the authentication via the previously established port
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "token",
                                token: token,
                            }
                        });
                    } catch (error) {
                        const e = error as Error
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "error",
                                error: {
                                    code: "unableToObtainToken",
                                    message: e.message || 'error has no message provided'
                                }
                            }
                        });
                    }

                    break;

                case "close":

                    // in the base of popup this is triggered by a user request to close the window
                    await onClose(command);

                    break;

                case "pick":

                    try {
                        await onPick(command);
    
                        // let the picker know that the pick command was handled (required)
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "success"
                            }
                        });
                    } catch (error) {
                        const e = error as Error
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "error",
                                error: {
                                    code: "unusableItem",
                                    message: e.message || 'error has no message provided'
                                }
                            }
                        });
                    }

                    break;

                default:
                    // Always send a reply, if if that reply is that the command is not supported.
                    port.postMessage({
                        type: "result",
                        id: message.data.id,
                        data: {
                            result: "error",
                            error: {
                                code: "unsupportedCommand",
                                message: command.command
                            }
                        }
                    });

                    break;
            }

            break;
    }
}
    // this adds a listener to the current (host) window, which the popup or embed will message when ready
    window.addEventListener('message', (event) => {
        if (event.source) {

        const message = event.data;

        // the channelId is part of the configuration options, but we could have multiple pickers so that is supported via channels
        // On initial load and if it ever refreshes in its window, the Picker will send an 'initialize' message.
        // Communication with the picker should subsequently take place using a `MessageChannel`.
        if (message.type === "initialize" && message.channelId === options.messaging.channelId) {
            // grab the port from the event
            port = event.ports[0];

            // add an event listener to the port (example implementation is in the next section)
            port.addEventListener("message", channelMessageListener);

            // start ("open") the port
            port.start();

            // tell the picker to activate
            port.postMessage({
                type: "activate",
            });
        }
    }
    })

    // we need to get an authentication token to use in the form below (more information in auth section)
    const authToken = await getToken(
        {
            resource: baseUrl,
            command: 'authenticate',
            type: 'SharePoint'
        },
        instance
    )

    // now we need to construct our query string
    // options: These are the browser configuration, see the schema link for a full explaination of the available options
    const queryString = new URLSearchParams({
        filePicker: JSON.stringify(options),
        locale: 'en-us'
    })

    const url = combine(baseUrl, `_layouts/15/FilePicker.aspx?${queryString}`)
    const form = iframeDocument.createElement('form')
    form.setAttribute('action', url)
    form.setAttribute('method', 'POST')
    iframeDocument.body.append(form)

    const input = iframeDocument.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', 'access_token')
    input.setAttribute('value', authToken)
    form.appendChild(input)

    form.submit()
}

export function Picker({onPick}: {onPick: (command: any) => Promise<void>}) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const { instance } = useMsal()

    const [contentWindow, setContentWindow] = useState<Window | null>(null)
    const onClose = () => {
        contentWindow?.close()
    }

    const pick = async (command: any) => {
        contentWindow?.close()
        await onPick(command)
    }


    // when component mounts, open a new window for filepicker
    useEffect(() => {
        setContentWindow(window.open('', 'Picker', 'width=800,height=600'))
    }, [iframeRef])

    // after new window mounts, open onedrive
    useEffect(() => {
        if (contentWindow) {
            createOneDriveWindow(instance, contentWindow.document, onClose, pick)
        }
    }, [contentWindow])

    return <></>
}
