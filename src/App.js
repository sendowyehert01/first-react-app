import './App.css';
import { useEffect, useState, useReducer, useRef }  from 'react';

function GithubUser({name, location, avatar}) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{location}</p>
      <img src={avatar} width='200px' alt={name}></img>
    </div>
  )
}

function App() {

// useState and useEffect -------------------------------------------------

  const [emotion, setEmotion] = useState('happy');
  const [secondary, setSecondary] = useState('tired');

  useEffect(() => {
      console.log(`It's ${emotion} right now.`)
  }, [emotion]);

  useEffect(() => {
    console.log(`It's ${secondary} right now.`)
}, [secondary]);  

// useReducer --------------------------------------------------------

const [check, setCheck] = useReducer((check) => !check , false);

// useRef------------------------------------------------------

const textTitle = useRef();
const hexColor = useRef();

const submit = (e) => {
  e.preventDefault();
  const title = textTitle.current.value;
  const color = hexColor.current.value;
  alert(`${title}, ${color}`);

};

// Fetch data from API-----------------------------------------------

const [data, setData] = useState(null);

useEffect(() => {
  fetch(
    'https://api.github.com/users/sendowyehert01'
  )
  .then((response) => response.json())
  .then(setData);
}, []);

    if (data) {
      return (        
      <GithubUser
        name={data.name}
        location={data.location}
        avatar={data.avatar_url}/>)
    }


  return (
    <div className="App">
      {/* useState and useEffect --------------------------------------*/}
        <h1>My current emotion is { emotion }.</h1>
        <button onClick={() => setEmotion('excited')}>Excited</button>
        <button onClick={() => setEmotion('sad')}>Sad</button>
        <h1>My current emotion is { secondary }.</h1>
        <button onClick={() => setSecondary('grateful')}>Grateful</button>
        <br/>
        <br/>

      {/* useReducer --------------------------------------------------*/}

        <input type="checkbox" 
        value={check}
        onChange={setCheck}/>
        <label>{check ? "Checked" : "not Checked"}</label>
        <br/>
        <br/>

        {/* useRef -------------------------------------------------------- */}

        <form onSubmit={submit}>
          <input type="text" 
          placeholder="type a color ..."
          ref={textTitle} />
          <input type="color" 
          ref={hexColor} />
          <button>ADD</button>
        </form>
    </div>
  );
}

export default App;
