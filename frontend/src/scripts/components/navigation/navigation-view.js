
var React = require('react');
let {Navbar, Nav, NavItem, DropdownButton, MenuItem} = require('react-bootstrap');







module.exports.navigation = (
  <Navbar brand={<a href="#">React-Bootstrap</a>}>
    <Nav>
      <DropdownButton eventKey={3} title='Dropdown'>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
        <MenuItem eventKey='3'>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Separated link</MenuItem>
      </DropdownButton>
    </Nav>
  </Navbar>
);




