import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./components/auth/AuthContext";
import { doSignOut } from "./firebase/auth";

function NaviBar() {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Navbar
            expand="md"
            fixed="top"
            variant="dark"
            style={navbarStyle}
        >
            <Container>
                {/* Logo — gradient text with subtle music note */}
                <Navbar.Brand as={Link} to="/" style={logoStyle}>
                    <span style={logoIconStyle}>♪</span> Riffrate
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="main-nav"
                    style={{ borderColor: 'rgba(255,255,255,0.18)', padding: '6px 10px' }}
                />

                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto align-items-center" style={{ gap: '4px' }}>
                        <Nav.Link as={Link} to="/" style={linkStyle}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ReviewByBand" style={linkStyle}>
                            Band Reviews
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ReviewByVenue" style={linkStyle}>
                            Venue Reviews
                        </Nav.Link>

                        {userLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/UserProfile" style={linkStyle}>
                                    Your Reviews
                                </Nav.Link>
                                <Nav.Link
                                    onClick={handleLogout}
                                    style={{ ...linkStyle, cursor: 'pointer' }}
                                >
                                    Log out
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/UserLogin" style={loginBtnStyle}>
                                Log in
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

/* ── Navbar Styles ──────────────────────────────────────────── */

const navbarStyle = {
    background: 'rgba(2, 7, 32, 0.88)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.065)',
    boxShadow: '0 4px 32px rgba(0,0,0,0.55), 0 0 60px rgba(75,91,255,0.06)',
    transition: 'background 0.3s ease',
    padding: '0.6rem 0',
};

const logoStyle = {
    fontFamily: '"Syne", sans-serif',
    fontWeight: '800',
    fontSize: '26px',
    letterSpacing: '-0.03em',
    background: 'linear-gradient(135deg, #ff5f5c 0%, #ffb040 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
};

const logoIconStyle = {
    WebkitTextFillColor: 'transparent',
    background: 'linear-gradient(135deg, #ff5f5c, #ffb040)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    fontSize: '22px',
};

const linkStyle = {
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: '"DM Sans", sans-serif',
    padding: '7px 13px',
    color: 'rgba(205, 218, 255, 0.78)',
    borderRadius: '8px',
    transition: 'color 0.2s, background 0.2s',
};

const loginBtnStyle = {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: '"DM Sans", sans-serif',
    padding: '7px 16px',
    background: 'rgba(255, 95, 92, 0.14)',
    border: '1px solid rgba(255, 95, 92, 0.32)',
    borderRadius: '8px',
    color: '#ffb3b1',
    marginLeft: '4px',
    transition: 'background 0.2s, border-color 0.2s',
};

export default NaviBar;