import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PsychologistEdit = () => {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    vocation: '',
    info: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const response = await axios.get(`/api/v1/psychologists/${id}`);
        setPsychologist(response.data.data.psychologist);
        setFormData(response.data.data.psychologist);
      } catch (error) {
        console.error('Error fetching psychologist:', error);
      }
    };

    fetchPsychologist();
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.patch(`/api/v1/psychologists/${id}`, formData);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error updating psychologist:', error);
    }
  };

  return (
    <div>
      <h2>Edit Psychologist</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Vocation:</label>
        <input type="text" name="vocation" value={formData.vocation} onChange={handleChange} />
        <label>Info:</label>
        <textarea name="info" value={formData.info} onChange={handleChange}></textarea>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default PsychologistEdit;
