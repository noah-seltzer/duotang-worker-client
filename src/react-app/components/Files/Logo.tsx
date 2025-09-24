import logo from './logo-300x176.png'

export function Logo() {
    return (
        <div className='flex lg:flex-1'>
            <a
                href='#'
                className='-m-1.5 p-1.5 flex flex-row items-center gap-4'
            >
                <img src={logo}></img>
                <h1 className='font-semibold text-white text-2xl'>Duotang</h1>
            </a>
        </div>
    )
}
