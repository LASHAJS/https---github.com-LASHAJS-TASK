import React, { useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { useHistory  } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const contacts = useSelector((state) =>  state.contactReducer );

  const history = useHistory();
  const dispatch =useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkName = contacts.find(
      (contact) => contact.name === name && contact);
    
      const checkLastname = contacts.find(
        (contact) => contact.lastname === lastname && contact );

    if (!name || !lastname || !age || !address) {
      return toast.warning("გთხოვთ შეავსოთ ყველა ველი");
    }
    if (checkName) {
      return toast.error("ეს სახელი უკვე გამოყენებულია");
    }
    if (checkLastname) {
      return toast.error("ეს გვარი უკვე გამოყენებულია");
    }

    const data = {
      id:  contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      name,
      lastname,
      age,
      address,
    };

    dispatch({type: "ADD_CONTACT",payload:data});
    toast.success("წარმატებით დაემატა");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">დამატება</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="სახელი"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="text"
                placeholder="გვარი"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="number"
                placeholder="ასაკი"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="მისამართი"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="დამატება"
              />
              <button
                  type="button"
                  className="btn btn-danger ms-3"
                  onClick={() => history.push("/")}
                >
                  გაუქმება
                </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
