import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InvestmentPage.css';

interface Investment {
  id: string;
  name: string;
  type: 'savings' | 'fixed-deposit' | 'mutual-fund' | 'stocks';
  amount: number;
  returnRate: number;
  maturityDate?: string;
  status: 'active' | 'matured' | 'pending';
  icon: string;
  color: string;
}

interface InvestmentProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  returnRate: number;
  duration: string;
  risk: 'low' | 'medium' | 'high';
  icon: string;
  color: string;
}

const InvestmentPage: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      name: 'High Yield Savings',
      type: 'savings',
      amount: 5000,
      returnRate: 4.5,
      status: 'active',
      icon: '💰',
      color: '#4CAF50'
    },
    {
      id: '2',
      name: 'Fixed Deposit 12M',
      type: 'fixed-deposit',
      amount: 10000,
      returnRate: 6.2,
      maturityDate: '2024-12-15',
      status: 'active',
      icon: '📈',
      color: '#2196F3'
    },
    {
      id: '3',
      name: 'Tech Growth Fund',
      type: 'mutual-fund',
      amount: 3000,
      returnRate: 12.5,
      status: 'active',
      icon: '🚀',
      color: '#FF9800'
    }
  ]);

  const [investmentProducts] = useState<InvestmentProduct[]>([
    {
      id: '1',
      name: 'Smart Savings',
      description: 'High-yield savings account with flexible withdrawals',
      minAmount: 100,
      returnRate: 4.5,
      duration: 'Flexible',
      risk: 'low',
      icon: '💰',
      color: '#4CAF50'
    },
    {
      id: '2',
      name: 'Fixed Deposit',
      description: 'Lock your money for higher returns',
      minAmount: 1000,
      returnRate: 6.2,
      duration: '12 months',
      risk: 'low',
      icon: '📈',
      color: '#2196F3'
    },
    {
      id: '3',
      name: 'Growth Fund',
      description: 'Diversified portfolio for long-term growth',
      minAmount: 500,
      returnRate: 12.5,
      duration: '5+ years',
      risk: 'medium',
      icon: '🚀',
      color: '#FF9800'
    },
    {
      id: '4',
      name: 'Stock Portfolio',
      description: 'Direct stock investments in top companies',
      minAmount: 1000,
      returnRate: 15.8,
      duration: 'Long-term',
      risk: 'high',
      icon: '📊',
      color: '#9C27B0'
    }
  ]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investments.reduce((sum, inv) => sum + (inv.amount * inv.returnRate / 100), 0);

  return (
    <div className="investment-page">
      {/* Header */}
      <header className="investment-header">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>Investments</h1>
        <button className="add-investment-btn">+ New</button>
      </header>

      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <div className="summary-card">
          <h3>Total Portfolio</h3>
          <h1>${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
          <p>Invested across {investments.length} products</p>
        </div>
        <div className="summary-card">
          <h3>Annual Returns</h3>
          <h1>${totalReturns.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
          <p>Expected this year</p>
        </div>
      </div>

      {/* Current Investments */}
      <section className="current-investments">
        <div className="section-header">
          <h3>Your Investments</h3>
          <Link to="/investment-details" className="view-all">View All</Link>
        </div>
        
        <div className="investments-list">
          {investments.map(investment => (
            <div key={investment.id} className="investment-card">
              <div className="investment-icon" style={{ backgroundColor: investment.color }}>
                {investment.icon}
              </div>
              <div className="investment-details">
                <h4>{investment.name}</h4>
                <p className="investment-type">{investment.type.replace('-', ' ')}</p>
                <p className="investment-amount">${investment.amount.toLocaleString()}</p>
              </div>
              <div className="investment-returns">
                <h4>{investment.returnRate}%</h4>
                <p>Return Rate</p>
                {investment.maturityDate && (
                  <p className="maturity-date">Matures: {new Date(investment.maturityDate).toLocaleDateString()}</p>
                )}
              </div>
              <div className="investment-status">
                <span className={`status-badge ${investment.status}`}>
                  {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Products */}
      <section className="investment-products">
        <h3>Available Products</h3>
        
        <div className="products-grid">
          {investmentProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <div className="product-icon" style={{ backgroundColor: product.color }}>
                  {product.icon}
                </div>
                <div className="risk-indicator">
                  <span className={`risk-badge ${product.risk}`}>
                    {product.risk.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                
                <div className="product-details">
                  <div className="detail-item">
                    <span className="label">Min Amount:</span>
                    <span className="value">${product.minAmount.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Return Rate:</span>
                    <span className="value">{product.returnRate}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Duration:</span>
                    <span className="value">{product.duration}</span>
                  </div>
                </div>
                
                <button className="invest-btn">Invest Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h3>Quick Actions</h3>
        
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span>Portfolio Analysis</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📈</span>
            <span>Market Trends</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🎯</span>
            <span>Set Goals</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📋</span>
            <span>Investment Plan</span>
          </button>
        </div>
      </section>

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
        <Link to="/investments" className="nav-item active">
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

export default InvestmentPage; 