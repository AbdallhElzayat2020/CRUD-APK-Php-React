import { useState } from "react";

const Register1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setAccept(true);
  };
  return (
    <div className="register flex items-center justify-center h-[90vh]">
      <div className="container flex items-center justify-center h-[90vh]">
        <form onSubmit={handleSubmit} action="" className="flex   flex-col ">
          <label htmlFor="name">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name=""
            id="name"
            placeholder="Enter Your Name"
          />
          {name}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name=""
            id="email"
            placeholder="Enter Your Email"
          />
          <label htmlFor="email">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name=""
            id="password"
            placeholder="Enter Your password"
          />
          <label htmlFor="passwordR">PasswordRepeat:</label>
          <input
            value={passwordR}
            onChange={(e) => setPasswordR(e.target.value)}
            type="password"
            name=""
            id="passwordR"
            placeholder="Enter Your password Repeat"
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register1;
