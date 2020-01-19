import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jil Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        id: 2,
        name: "Sarah Wilson",
        email: "sarah@gmail.com",
        phone: "111-111-2222",
        type: "professional"
      },
      {
        id: 3,
        name: "Jack Maa",
        email: "jack@gmail.com",
        phone: "111-111-3333",
        type: "personal"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contacts

  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete Contacts

  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //Set Current Contacts
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear current Contacts

  const clearCurrentContact = contact => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //update contacts
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //Filter Contacts

  const filterContact = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  //Clear Filter
  const clearFilterContact = contact => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        clearFilterContact,
        filterContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
