import { useState } from 'react'
import axios from 'axios'
import { Building, MapPin, PlusCircle, CheckCircle, AlertCircle } from 'lucide-react'

export default function AddSchoolForm({ onSchoolAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  })
  
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          }))
        },
        (error) => {
          console.error("Error getting location", error)
          alert("Could not get your location. Please enter manually.")
        }
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      // Data is sent to the Vite proxy, which forwards to http://localhost:3000
      const response = await axios.post('/api/addSchool', {
        name: formData.name,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      })

      setStatus({ type: 'success', message: 'School successfully added!' })
      setFormData({ name: '', address: '', latitude: '', longitude: '' })
      if(onSchoolAdded) onSchoolAdded() // Refresh the list
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to add school. Please check your inputs.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card">
      <div className="card-header">
        <PlusCircle className="title-gradient" size={24} />
        <h2>Add a New School</h2>
      </div>

      {status.message && (
        <div className={`alert alert-${status.type}`}>
          {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">School Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="e.g. Greenwood High"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-input"
            placeholder="e.g. 123 Education Lane"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              className="form-input"
              placeholder="e.g. 28.6139"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              className="form-input"
              placeholder="e.g. 77.2090"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleGetCurrentLocation}
            style={{ flex: 1 }}
          >
            <MapPin size={18} /> Use My Location
          </button>
          
          <button type="submit" className="btn" disabled={loading} style={{ flex: 2 }}>
            {loading ? 'Adding...' : 'Save School'}
          </button>
        </div>
      </form>
    </div>
  )
}
