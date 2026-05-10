import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigation, MapPin, Loader, Building, AlertCircle } from 'lucide-react'

export default function SchoolList({ refreshTrigger }) {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [location, setLocation] = useState({ latitude: '', longitude: '' })
  const [hasSearched, setHasSearched] = useState(false)

  // Try to get user location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          })
          // Auto fetch if we got location successfully
          fetchSchools(position.coords.latitude, position.coords.longitude)
        },
        () => {
          // Silent fallback, they can enter it manually
        }
      )
    }
  }, [])

  // Refetch if the parent tells us to (like after adding a new school)
  useEffect(() => {
    if (hasSearched && location.latitude && location.longitude) {
      fetchSchools(location.latitude, location.longitude)
    }
  }, [refreshTrigger])

  const fetchSchools = async (lat, lon) => {
    if(!lat || !lon) return

    setLoading(true)
    setError('')
    setHasSearched(true)
    
    try {
      const response = await axios.get(`/api/listSchools?latitude=${lat}&longitude=${lon}`)
      setSchools(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch schools.')
    } finally {
      setLoading(false)
    }
  }

  const handleManualSearch = (e) => {
    e.preventDefault()
    fetchSchools(location.latitude, location.longitude)
  }

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-header">
        <Navigation className="title-gradient" size={24} />
        <h2>Find Nearby Schools</h2>
      </div>

      <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="number"
          step="any"
          className="form-input"
          placeholder="Lat"
          value={location.latitude}
          onChange={(e) => setLocation({...location, latitude: e.target.value})}
          required
        />
        <input
          type="number"
          step="any"
          className="form-input"
          placeholder="Lng"
          value={location.longitude}
          onChange={(e) => setLocation({...location, longitude: e.target.value})}
          required
        />
        <button type="submit" className="btn btn-secondary" style={{ width: 'auto' }}>
          Search
        </button>
      </form>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        {loading ? (
          <div className="empty-state">
            <Loader className="loader title-gradient" size={40} style={{ margin: '0 auto 1rem' }} />
            <p>Locating the best schools near you...</p>
          </div>
        ) : schools.length > 0 ? (
          <div className="school-list">
            {schools.map((school) => (
              <div key={school.id} className="school-item">
                <div className="school-info">
                  <h3>{school.name}</h3>
                  <p><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }}/>{school.address}</p>
                </div>
                <div className="school-distance">
                  {school.distance}
                </div>
              </div>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="empty-state">
            <Building size={48} />
            <p>No schools found. Try adding one!</p>
          </div>
        ) : (
          <div className="empty-state">
            <MapPin size={48} />
            <p>Enter your location or allow browser permissions to see nearby schools.</p>
          </div>
        )}
      </div>
    </div>
  )
}
