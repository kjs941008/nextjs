'use client'

import styles from './nav.css'
import {useRouter} from 'next/navigation'

function Nav() {
    const router = useRouter();
    return (
        <main className={styles.main}>
            <nav>
                <div className="nav-bar">
                    <i className='bx bx-menu sidebarOpen' ></i>
                    <span className="logo navLogo"><a href="#">Enviro</a></span>

                    <div className="menu">
                        <div className="logo-toggle">
                            <span className="logo"><a href="#">Enviro</a></span>
                            <i className='bx bx-x siderbarClose'></i>
                        </div>

                        <ul className="nav-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Portfolio</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                            <ii><a href="/signup">Signup</a></ii>
                            <li><a href="//login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </main>
        )
}

const ll = () => {
    const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light"),
    searchToggle = document.querySelector(".searchToggle"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    siderbarClose = document.querySelector(".siderbarClose");
    let getMode = localStorage.getItem("mode");
        if(getMode && getMode === "dark-mode"){
          body.classList.add("dark");
        }
        // js code to toggle dark and light mode
            modeToggle.addEventListener("click" , () =>{
            modeToggle.classList.toggle("active");
            body.classList.toggle("dark");
            // js code to keep user selected mode even page refresh or file reopen
            if(!body.classList.contains("dark")){
                localStorage.setItem("mode" , "light-mode");
            }else{
                localStorage.setItem("mode" , "dark-mode");
            }
            });
        // js code to toggle search box
            searchToggle.addEventListener("click" , () =>{
            searchToggle.classList.toggle("active");
            });

            
        //   js code to toggle sidebar
        sidebarOpen.addEventListener("click" , () =>{
        nav.classList.add("active");
        });
        body.addEventListener("click" , e =>{
        let clickedElm = e.target;
        if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
            nav.classList.remove("active");
        }
        });
}

export default Nav;