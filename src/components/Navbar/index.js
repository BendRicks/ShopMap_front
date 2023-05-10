import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
  export function GuestNavbar() {    
  return (
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Main
          </NavLink>
          <NavLink to="/shops">
            Shops
          </NavLink>
          <NavLink to="/sign-up">
            Sign Up
          </NavLink><NavLink to="/sign-in">
            Sign In
          </NavLink>
        </NavMenu>
      </Nav>
  );
};

export function UserNavbar() {    
  return (
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Main
          </NavLink>
          <NavLink to="/shops">
            Shops
          </NavLink>
          <NavLink to="/shop/create">
            Create Shop
          </NavLink>
          <NavLink to="/logout">
            Log Out
          </NavLink><NavLink to="/account">
            Account
          </NavLink>
        </NavMenu>
      </Nav>
  );
};

export function AdminNavbar() {    
  return (
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Main
          </NavLink>
          <NavLink to="/shops">
            Shops
          </NavLink>
          <NavLink to="/shops/moderation">
            Moderation
          </NavLink>
          <NavLink to="/shop/create">
            Create Shop
          </NavLink>
          <NavLink to="/logout">
            Log Out
          </NavLink><NavLink to="/account">
            Account
          </NavLink>
        </NavMenu>
      </Nav>
  );
};

export function ModeratorNavbar() {    
  return (
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Main
          </NavLink>
          <NavLink to="/shops">
            Shops
          </NavLink>
          <NavLink to="/shops/moderation">
            Moderation
          </NavLink>
          <NavLink to="/shop/create">
            Create Shop
          </NavLink>
          <NavLink to="/logout">
            Log Out
          </NavLink><NavLink to="/account">
            Account
          </NavLink>
        </NavMenu>
      </Nav>
  );
};
