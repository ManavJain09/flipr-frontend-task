import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopicSelectionPage() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedTopics, setSortedTopics] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-eexgfbu/endpoint/v2/list?list=show');
        console.log(response.data);
        setTopics(response.data);
        setSortedTopics(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopics();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredTopics = topics.filter(topic => topic.topic.toLowerCase().includes(searchTerm.toLowerCase()));
    setSortedTopics(filteredTopics);
  };

  const handleSort = (event) => {
    const sortOption = event.target.value;
    let sortedTopics = [...topics];
    if (sortOption === 'alphabetical') {
      sortedTopics.sort((a, b) => a.topic.localeCompare(b.topic));
    }
    setSortedTopics(sortedTopics);
  };

  const handleDifficultyLevelChange = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected topic:', selectedTopic);
    console.log('Difficulty level:', difficultyLevel);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', }}>
      <h1 style={{ fontSize: '2em', marginTop: '2rem' }}>Topic Selection Page</h1>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search topics" style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '5px' }} />
      <select value={sortedTopics} onChange={handleSort} style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '5px' }}>
        <option value="alphabetical">Alphabetical</option>
      </select>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
        {sortedTopics.map(topic => (
          <div className="card" style={{ width: '18rem', margin: '1rem' }} key={topic.topic}>
            <div className="card-body">
              <h5 className="card-title">{topic.topic}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Easy: {topic.easy}, Medium: {topic.medium}, Hard: {topic.hard}</h6>
              <button className="btn btn-primary" onClick={() => handleTopicSelect(topic)}>Select</button>
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: '2rem', fontSize: '1.5em', fontWeight: 'bold' }}>Difficulty Level</h2>
      <select value={difficultyLevel} onChange={handleDifficultyLevelChange} style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '5px' }}>
        <option value="">Select a difficulty level</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default TopicSelectionPage;
