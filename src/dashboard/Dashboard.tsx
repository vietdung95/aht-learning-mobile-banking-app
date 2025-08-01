import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accountNumber: string;
  type: 'checking' | 'savings' | 'investment';
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  route: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Primary Account',
      balance: 15420.50,
      currency: 'USD',
      accountNumber: '****1234',
      type: 'checking'
    },
    {
      id: '2',
      name: 'Savings Account',
      balance: 8750.25,
      currency: 'USD',
      accountNumber: '****5678',
      type: 'savings'
    }
  ]);

  const [quickActions] = useState<QuickAction[]>([
    { id: '1', title: 'Send Money', icon: '💸', route: '/transfer', color: '#4CAF50' },
    { id: '2', title: 'Pay Bills', icon: '📄', route: '/payments', color: '#2196F3' },
    { id: '3', title: 'Investments', icon: '📈', route: '/investments', color: '#FF9800' },
    { id: '4', title: 'Cards', icon: '💳', route: '/cards', color: '#9C27B0' },
    { id: '5', title: 'Analytics', icon: '📊', route: '/analytics', color: '#607D8B' },
    { id: '6', title: 'Support', icon: '🆘', route: '/support', color: '#F44336' }
  ]);

  const [recentTransactions] = useState([
    { id: '1', description: 'Coffee Shop', amount: -4.50, date: '2024-01-15', type: 'expense' },
    { id: '2', description: 'Salary Deposit', amount: 3500.00, date: '2024-01-14', type: 'income' },
    { id: '3', description: 'Grocery Store', amount: -85.30, date: '2024-01-13', type: 'expense' },
    { id: '4', description: 'Transfer to John', amount: -200.00, date: '2024-01-12', type: 'transfer' }
  ]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <h2>Welcome back, Alex!</h2>
            <p>Good morning • {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="notification-btn">🔔</button>
          <button className="settings-btn">⚙️</button>
        </div>
      </header>

      {/* Total Balance Card */}
      <div className="balance-card">
        <div className="balance-info">
          <h3>Total Balance</h3>
          <h1>${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
          <p>Across {accounts.length} accounts</p>
        </div>
        <div className="balance-actions">
          <button className="btn-primary">Add Money</button>
          <button className="btn-secondary">View Details</button>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          {quickActions.map(action => (
            <Link key={action.id} to={action.route} className="action-card">
              <div className="action-icon" style={{ backgroundColor: action.color }}>
                {action.icon}
              </div>
              <span>{action.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Accounts Overview */}
      <section className="accounts-section">
        <div className="section-header">
          <h3>Your Accounts</h3>
          <Link to="/accounts" className="view-all">View All</Link>
        </div>
        <div className="accounts-list">
          {accounts.map(account => (
            <div key={account.id} className="account-card">
              <div className="account-info">
                <h4>{account.name}</h4>
                <p>{account.accountNumber}</p>
              </div>
              <div className="account-balance">
                <h3>${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                <span className="account-type">{account.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="transactions-section">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <Link to="/transactions" className="view-all">View All</Link>
        </div>
        <div className="transactions-list">
          {recentTransactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-icon">
                {transaction.type === 'expense' ? '💸' : 
                 transaction.type === 'income' ? '💰' : '🔄'}
              </div>
              <div className="transaction-details">
                <h4>{transaction.description}</h4>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
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
        <Link to="/profile" className="nav-item">
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard; 