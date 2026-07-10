import './JokeButton.css';

const JokeButton = ({ onClick }) => {
  return (
    <button className="joke-button" onClick={onClick} title="Get a random joke!">
      😂 Joke
    </button>
  );
};

export default JokeButton;
