import { Form, Link, NavLink, Outlet, redirect, useLoaderData } from "react-router-dom";
import { createContact, getContacts } from "../contacts";

export const loader = async () =>{
  const contacts = await getContacts();
  return {contacts}
}

export const action = async ( ) => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const {contacts} = useLoaderData();


  
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {/* <ul>
            <li>
              <Link to={`/contacts/1`}>COntact 1</Link>
            </li>
            <li>
              <Link to={'contacts/2'}>Contact 2</Link>
            </li>
          </ul> */}
          {contacts.length ? (
            <ul>
              {contacts && contacts.map(c=>(
                <li key={c.id}>
                  <NavLink to={`contacts/${c.id}`} className={({isActive, isPending})=>
                    isActive ? "active" : isPending ? "pending" : "" }  >
                    {(c.first || c.last) ? (
                    <span>{c.first} {c.last}</span>
                    ) : <span>No name</span>
                    }{" "}
                    {c.favourite && <span>*</span>}
                  </NavLink>

                </li>
              ))}

            </ul>
          ): (
            <p>No contacts</p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet/>
      </div>
    </>
  );
}