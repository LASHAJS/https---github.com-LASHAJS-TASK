import React, { useEffect,useState } from "react";
import {useHistory  , useParams,} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { toast } from "react-toastify";

const EditContact = () => {

  const { id } = useParams();
  const contacts = useSelector((state) =>state.contactReducer);
  
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");


  const history = useHistory();
  const dispatch = useDispatch();

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id));

  useEffect(() => {
      if(currentContact){
        setName(currentContact.name);
        setLastname(currentContact.lastname);
        setAge(currentContact.age);
        setAddress(currentContact.address);
      }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkName = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.name === name);
    
      const checkLastname = contacts.find(
        (contact) => contact.id !== parseInt(id) && contact.lastname === lastname);

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
      id: currentContact.id,
      name,
      lastname,
      age,
      address,
    };

    dispatch({type: "UPDATE_CONTACT" , payload: data});
    toast.success("წარმატებით შეიცვალა");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        
        <div className="col-md-6 mx-auto shadow p-5 mt-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group  mb-3">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"სახელი"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group  mb-3">
                <input
                  className="form-control"
                  value={lastname}
                  placeholder={"გვარი"}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="form-group  mb-3">
                <input
                  className="form-control"
                  value={age}
                  type="number"
                  placeholder={"ასაკი"}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-group  mb-3">
                <input
                  className="form-control"
                  value={address}
                  placeholder={"მისამართი"}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                 შეცვლა
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  გაუქმება
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">{id}არავინ მოიძებნა</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditContact
