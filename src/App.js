import {
  Card,
  Button,
  EditableText,
  Toaster,
  Position,
  InputGroup,
} from "@blueprintjs/core";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const AppToaster = Toaster.create({
  position: Position.TOP,
});

function App() {
  const [persons, setPersons] = useState([]);

  //add
  const [newFirstName, setNewFirstName] = useState();
  const [newMiddleName, setNewMiddleName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newGender, setNewGender] = useState();
  const [newBirthDate, setNewBirthDate] = useState();
  const [newCity, setNewCity] = useState();
  const [newState, setNewState] = useState();
  const [newCountry, setNewCountry] = useState();
  const [newZip, setNewZip] = useState();

  //get

  useEffect(() => {
    axios
      .get("https://devservices.qpathways.com/otc/test/user")
      .then((response) => {
        setPersons(response.data);
      });
  }, []);

  // post
  const addPerson = () => {
    console.log("firstname", newFirstName);

    axios
      .post("https://devservices.qpathways.com/otc/test/user/save", {
        id: uuidv4(),

        firstname: newFirstName,
        middlename: newMiddleName,
        lastname: newLastName,
        gender: newGender,
        birthdate: newBirthDate,
        city: newCity,
        state: newState,
        country: newCountry,
        zip: newZip,
      })
      .then((response) => {
        setPersons([...persons.reverse(), response.data]);
        setNewFirstName("");
        setNewMiddleName("");
        setNewLastName("");
        setNewGender("");
        setNewBirthDate("");
        setNewCity("");
        setNewState("");
        setNewCountry("");
        setNewZip("");
      });
  };

  console.log(persons);

  //put

  const updateData = (id) => {
    const data = persons.find((item) => item.id === id);
    axios
      .put(`https://devservices.qpathways.com/otc/test/user/${id}`, data)
      .then((response) => {
        AppToaster.show({
          message: "Data updated successfully",
          intent: "success",
          timeout: 3000,
        });
      });
  };

  //update data
  const onChangeHandler = (id, key, value) => {
    setPersons((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  //delete data
  const deleteData = (id) => {
    axios
      .delete(`https://devservices.qpathways.com/otc/test/user/delete/{id}`)
      .then((response) => {
        setPersons((values) => {
          return values.filter((item) => item.id !== id);
        });

        AppToaster.show({
          message: "Data deleted successfully",
          intent: "success",
          timeout: 3000,
        });
      });
  };

  return (
    <div className="App">
      <Container fluid>
        <Card>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <InputGroup
                    placeholder="First Name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    placeholder="Middle Name"
                    value={newMiddleName}
                    onChange={(e) => setNewMiddleName(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    placeholder="Last Name"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    placeholder="Gender"
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    placeholder="Birth Date"
                    value={newBirthDate}
                    onChange={(e) => setNewBirthDate(e.target.value)}
                  />{" "}
                </th>
                <th>
                  <InputGroup
                    placeholder="City"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    placeholder="State"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    placeholder="Country"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    placeholder="Zip"
                    value={newZip}
                    onChange={(e) => setNewZip(e.target.value)}
                  />
                </th>
              </tr>
            </thead>
          </Table>

          <Button intent="success" onClick={() => addPerson()}>
            Add Person
          </Button>
          <br></br>
          <br></br>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id </th>
                <th>First Name</th>
                <th>Middle Name </th>
                <th>Last Name </th>
                <th>Gender</th>
                <th>Birthdate </th>
                <th>City</th>
                <th>State</th>
                <th>Country </th>
                <th>Zip </th>

                <th>Operation </th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => {
                return (
                  <tr key={person.id}>
                    <td>
                      <EditableText
                        value={person.id}
                        onChange={(value) =>
                          onChangeHandler(person.id, "id", value)
                        }
                      />
                    </td>
                    <td>
                      <EditableText
                        value={person.firstname}
                        onChange={(value) =>
                          onChangeHandler(person.id, "firstname", value)
                        }
                      />
                    </td>
                    <td>
                      <EditableText
                        value={person.middlename}
                        onChange={(value) =>
                          onChangeHandler(person.id, "middlename", value)
                        }
                      />
                    </td>
                    <td>
                      <EditableText
                        value={person.lastname}
                        onChange={(value) =>
                          onChangeHandler(person.id, "lastname", value)
                        }
                      />
                    </td>
                    <td>
                      <EditableText
                        value={person.gender}
                        onChange={(value) =>
                          onChangeHandler(person.id, "gender", value)
                        }
                      />
                    </td>

                    <td>
                      <EditableText
                        value={person.birthdate}
                        onChange={(value) =>
                          onChangeHandler(person.id, "birthdate", value)
                        }
                      />
                    </td>
                    <td>
                      {/* {person.city} */}
                      <EditableText
                        value={person.city}
                        onChange={(value) =>
                          onChangeHandler(person.id, "city", value)
                        }
                      />
                    </td>
                    <td>
                      <EditableText
                        value={person.state}
                        onChange={(value) =>
                          onChangeHandler(person.id, "state", value)
                        }
                      />
                    </td>
                    <td>
                      <EditableText
                        value={person.country}
                        onChange={(value) =>
                          onChangeHandler(person.id, "country", value)
                        }
                      />
                    </td>
                    <td>
                      <EditableText
                        value={person.zip}
                        onChange={(value) =>
                          onChangeHandler(person.id, "zip", value)
                        }
                      />
                    </td>
                    <td>
                      <Button
                        intent="primary"
                        onClick={() => updateData(person.id)}
                      >
                        Update
                      </Button>
                    </td>

                    <td>
                      
                      <Button
                        intent="danger"
                        onClick={() => deleteData(person.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <br></br>
          <br></br>
        </Card>
      </Container>
    </div>
  );
}

export default App;
