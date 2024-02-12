interface NavBarProps {
    brandName: string;
    navItems: {name : string , link:string}[];
}
  
function NavBar({ brandName, navItems }: NavBarProps) {

    return (
        <nav >
        <div className="w-full">
            <div className="md:px-10 py-4 justify-start items-center bg-[#D9D9D9] md:flex">
                <div className="md:flex text-2x1 cursor-pointer items-center gap-2 pl-9">
                    <a className = "font-bold" href="#">{brandName}</a>
                </div>
                
                <ul className="md:flex pl-9 md:pl-0">
                    {
                        navItems.map((link) => 
                            <li className="my-7 md:my-0 md:ml-8"> 
                                <a href = {link.link}>{link.name}</a>
                            </li>
                        )
                    }
                </ul>
                <form className="md:flex pl-9 md:pl-0 mr-4 ml-4 basis-4/5 justify-end ">
                    <input
                    className="my-7 md:my-0 md:ml-8 border-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    />
                    <button className="pl-3" type="submit">
                    Search
                    </button>
                </form>
            </div>
        </div>
        </nav>
    );
}

  export default NavBar;