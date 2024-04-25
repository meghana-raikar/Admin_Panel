import React, { useState } from "react";

const Registration = () => {
    const [user, setUser] = useState({
      username: "",
      email:"",
      phone:"",
      password:""
    });

    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      //spread operator is used so that the any other data enter should not change(sirf phone number change kiya toh sirf wahi change hona chahiye baki nhi)
      setUser({
        ...user,
        [name]: value,
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      alert("registered successfully")
    }


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="/images/register.png" alt="Registration" width="450" height="500" />
              </div>
              {/* registration code */}

              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1> <br/>

                <form onSubmit={handleSubmit}>
                  <div>
                  <label htmlFor="username">username</label>
                  <input type="text" name="username" placeholder= "username" id="username" required autoComplete="off" value={user.username} onChange={handleInput}/>
                  </div>

                  <div>
                  <label htmlFor="email">email</label>
                  <input type="email" name="email" placeholder="email" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                  </div>

                  <div>
                  <label htmlFor="phone">phone</label>
                  <input type="number" name="phone" placeholder="Phone number" id="phone " required autoComplete="off" value={user.phone} onChange={handleInput} />
                  </div>

                  <div>
                  <label htmlFor="password">password</label>
                  <input type="password" name="password" placeholder= "password" id="password" required autoComplete="off" value={user.password} onChange={handleInput}/>
                  </div>

                  <br />
                  <button type="submit " className="btn btn-submit" >Register</button>
                </form>

              </div>





            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Registration;
