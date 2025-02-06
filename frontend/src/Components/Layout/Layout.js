import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Layout({ children }) {

const navigate = useNavigate();
    return (
        <div className='card-main-heading'>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Assignment</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page" href="#" onClick={() => navigate('/')}>Department </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"onClick={() => navigate('/Designation')}>Designation</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"onClick={() => navigate('/Employee')}>Employees</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </header>


            <main>{children}</main>


            <footer className=" text-black pt-4 ">
                <div className="container text-center">
                   
                </div>
            </footer>
        </div>
    )
}

export default Layout