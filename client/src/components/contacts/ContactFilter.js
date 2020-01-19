import React, { useRef, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/contactContext";

const ContactFilter = () => {
  const text = useRef("");
  const contactContext = useContext(ContactContext);

  const { filtered, clearFilterContact, filterContact } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilterContact();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts....'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
