import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountProfile.css';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  accountNumber: string;
  memberSince: string;
  status: 'active' | 'pending' | 'suspended';
}

const AccountProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: '123 Main Street, New York, NY 10001',
    accountNumber: '****1234',
    memberSince: '2020-03-15',
    status: 'active'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Profile Settings</h1>
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </header>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>
          <div className="profile-status">
            <span className={`status-badge ${profile.status}`}>
              {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="profile-info">
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p className="member-since">Member since {new Date(profile.memberSince).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <h3>Personal Information</h3>
        
        <div className="detail-group">
          <label>First Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="edit-input"
            />
          ) : (
            <p>{profile.firstName}</p>
          )}
        </div>

        <div className="detail-group">
          <label>Last Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="edit-input"
            />
          ) : (
            <p>{profile.lastName}</p>
          )}
        </div>

        <div className="detail-group">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              value={editedProfile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="edit-input"
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>

        <div className="detail-group">
          <label>Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={editedProfile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="edit-input"
            />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>

        <div className="detail-group">
          <label>Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={editedProfile.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="edit-input"
            />
          ) : (
            <p>{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
          )}
        </div>

        <div className="detail-group">
          <label>Address</label>
          {isEditing ? (
            <textarea
              value={editedProfile.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="edit-textarea"
              rows={3}
            />
          ) : (
            <p>{profile.address}</p>
          )}
        </div>

        <div className="detail-group">
          <label>Account Number</label>
          <p className="account-number">{profile.accountNumber}</p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="security-section">
        <h3>Security Settings</h3>
        
        <div className="security-item">
          <div className="security-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <button className="security-btn">Enable</button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Biometric Login</h4>
            <p>Use fingerprint or face recognition to login</p>
          </div>
          <button className="security-btn">Setup</button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Change Password</h4>
            <p>Update your account password</p>
          </div>
          <button className="security-btn">Change</button>
        </div>
      </div>

      {/* Preferences */}
      <div className="preferences-section">
        <h3>Preferences</h3>
        
        <div className="preference-item">
          <div className="preference-info">
            <h4>Notifications</h4>
            <p>Manage your notification preferences</p>
          </div>
          <button className="preference-btn">Configure</button>
        </div>

        <div className="preference-item">
          <div className="preference-info">
            <h4>Language</h4>
            <p>Choose your preferred language</p>
          </div>
          <button className="preference-btn">English</button>
        </div>

        <div className="preference-item">
          <div className="preference-info">
            <h4>Theme</h4>
            <p>Light or dark mode</p>
          </div>
          <button className="preference-btn">Light</button>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="action-buttons">
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/accounts" className="nav-item">
          <span className="nav-icon">💼</span>
          <span>Accounts</span>
        </Link>
        <Link to="/payments" className="nav-item">
          <span className="nav-icon">💳</span>
          <span>Pay</span>
        </Link>
        <Link to="/investments" className="nav-item">
          <span className="nav-icon">📈</span>
          <span>Invest</span>
        </Link>
        <Link to="/profile" className="nav-item active">
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default AccountProfile; 