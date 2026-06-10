from typing import Optional
import datetime
import decimal

from sqlalchemy import BigInteger, Boolean, CheckConstraint, Date, DateTime, ForeignKeyConstraint, Integer, Numeric, PrimaryKeyConstraint, String, Text, UniqueConstraint, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class AssetTypes(Base):
    __tablename__ = 'asset_types'
    __table_args__ = (
        PrimaryKeyConstraint('asset_type_id', name='asset_types_pkey'),
        UniqueConstraint('asset_name', name='asset_types_asset_name_key')
    )

    asset_type_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    asset_name: Mapped[str] = mapped_column(String(50), nullable=False)
    asset_category: Mapped[str] = mapped_column(String(30), nullable=False)
    valuation_source: Mapped[str] = mapped_column(String(30), nullable=False)
    is_liquid: Mapped[Optional[bool]] = mapped_column(Boolean, server_default=text('true'))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    assets: Mapped[list['Assets']] = relationship('Assets', back_populates='asset_type')


class Users(Base):
    __tablename__ = 'users'
    __table_args__ = (
        PrimaryKeyConstraint('user_id', name='users_pkey'),
        UniqueConstraint('customer_id', name='users_customer_id_key'),
        UniqueConstraint('email', name='users_email_key')
    )

    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    customer_id: Mapped[str] = mapped_column(String(20), nullable=False)
    full_name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    contact: Mapped[Optional[str]] = mapped_column(String(15))
    dob: Mapped[Optional[datetime.date]] = mapped_column(Date)
    occupation: Mapped[Optional[str]] = mapped_column(String(100))
    annual_income: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(15, 2))
    city: Mapped[Optional[str]] = mapped_column(String(100))
    state: Mapped[Optional[str]] = mapped_column(String(100))
    risk_profile: Mapped[Optional[str]] = mapped_column(String(20))
    customer_segment: Mapped[Optional[str]] = mapped_column(String(20))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    accounts: Mapped[list['Accounts']] = relationship('Accounts', back_populates='user')
    assets: Mapped[list['Assets']] = relationship('Assets', back_populates='user')
    audit_logs: Mapped[list['AuditLogs']] = relationship('AuditLogs', back_populates='user')
    devices: Mapped[list['Devices']] = relationship('Devices', back_populates='user')
    financial_twin: Mapped['FinancialTwin'] = relationship('FinancialTwin', uselist=False, back_populates='user')
    goals: Mapped[list['Goals']] = relationship('Goals', back_populates='user')
    recommendations: Mapped[list['Recommendations']] = relationship('Recommendations', back_populates='user')
    fraud_alerts: Mapped[list['FraudAlerts']] = relationship('FraudAlerts', back_populates='user')
    risk_assessment_logs: Mapped[list['RiskAssessmentLogs']] = relationship('RiskAssessmentLogs', back_populates='user')


class Accounts(Base):
    __tablename__ = 'accounts'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='accounts_user_id_fkey'),
        PrimaryKeyConstraint('account_id', name='accounts_pkey')
    )

    account_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    bank_name: Mapped[str] = mapped_column(String(100), nullable=False)
    account_type: Mapped[str] = mapped_column(String(30), nullable=False)
    account_number_masked: Mapped[str] = mapped_column(String(20), nullable=False)
    ifsc_code: Mapped[Optional[str]] = mapped_column(String(11))
    balance: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(15, 2), server_default=text('0'))
    linked_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    user: Mapped['Users'] = relationship('Users', back_populates='accounts')
    transactions: Mapped[list['Transactions']] = relationship('Transactions', back_populates='account')


class Assets(Base):
    __tablename__ = 'assets'
    __table_args__ = (
        ForeignKeyConstraint(['asset_type_id'], ['asset_types.asset_type_id'], name='assets_asset_type_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='assets_user_id_fkey'),
        PrimaryKeyConstraint('asset_id', name='assets_pkey')
    )

    asset_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    asset_type_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    current_value: Mapped[decimal.Decimal] = mapped_column(Numeric(15, 4), nullable=False, server_default=text('0.0000'))
    account_reference_id: Mapped[Optional[str]] = mapped_column(String(50))
    asset_name_custom: Mapped[Optional[str]] = mapped_column(String(100))
    currency: Mapped[Optional[str]] = mapped_column(String(3), server_default=text("'INR'::character varying"))
    last_updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    asset_type: Mapped['AssetTypes'] = relationship('AssetTypes', back_populates='assets')
    user: Mapped['Users'] = relationship('Users', back_populates='assets')
    asset_history: Mapped[list['AssetHistory']] = relationship('AssetHistory', back_populates='asset')


class AuditLogs(Base):
    __tablename__ = 'audit_logs'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='audit_logs_user_id_fkey'),
        PrimaryKeyConstraint('log_id', name='audit_logs_pkey')
    )

    log_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    action: Mapped[str] = mapped_column(String(100), nullable=False)
    action_timestamp: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    ip_address: Mapped[Optional[str]] = mapped_column(String(45))
    request_metadata: Mapped[Optional[dict]] = mapped_column(JSONB)
    risk_signal_type: Mapped[Optional[str]] = mapped_column(String(100))

    user: Mapped['Users'] = relationship('Users', back_populates='audit_logs')


class Devices(Base):
    __tablename__ = 'devices'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='devices_user_id_fkey'),
        PrimaryKeyConstraint('device_id', name='devices_pkey')
    )

    device_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    device_name: Mapped[Optional[str]] = mapped_column(String(100))
    device_fingerprint: Mapped[Optional[str]] = mapped_column(String(255))
    is_trusted: Mapped[Optional[bool]] = mapped_column(Boolean, server_default=text('false'))
    last_login: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)

    user: Mapped['Users'] = relationship('Users', back_populates='devices')


class FinancialTwin(Base):
    __tablename__ = 'financial_twin'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='financial_twin_user_id_fkey'),
        PrimaryKeyConstraint('twin_id', name='financial_twin_pkey'),
        UniqueConstraint('user_id', name='financial_twin_user_id_key')
    )

    twin_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    monthly_income: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(15, 2))
    monthly_expense: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(15, 2))
    monthly_savings: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(15, 2))
    net_worth: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(15, 2))
    financial_health_score: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(5, 2))
    last_updated: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    user: Mapped['Users'] = relationship('Users', back_populates='financial_twin')


class Goals(Base):
    __tablename__ = 'goals'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='goals_user_id_fkey'),
        PrimaryKeyConstraint('goal_id', name='goals_pkey')
    )

    goal_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    goal_name: Mapped[str] = mapped_column(String(100), nullable=False)
    target_amount: Mapped[decimal.Decimal] = mapped_column(Numeric(15, 2), nullable=False)
    current_amount: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(15, 2), server_default=text('0'))
    target_date: Mapped[Optional[datetime.date]] = mapped_column(Date)
    priority: Mapped[Optional[str]] = mapped_column(String(20))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    user: Mapped['Users'] = relationship('Users', back_populates='goals')


class Recommendations(Base):
    __tablename__ = 'recommendations'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='recommendations_user_id_fkey'),
        PrimaryKeyConstraint('recommendation_id', name='recommendations_pkey')
    )

    recommendation_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    recommendation_type: Mapped[str] = mapped_column(String(50), nullable=False)
    recommendation_text: Mapped[str] = mapped_column(Text, nullable=False)
    confidence_score: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(5, 2))
    generated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    user: Mapped['Users'] = relationship('Users', back_populates='recommendations')


class AssetHistory(Base):
    __tablename__ = 'asset_history'
    __table_args__ = (
        ForeignKeyConstraint(['asset_id'], ['assets.asset_id'], ondelete='CASCADE', name='asset_history_asset_id_fkey'),
        PrimaryKeyConstraint('history_id', name='asset_history_pkey')
    )

    history_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    asset_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    recorded_value: Mapped[decimal.Decimal] = mapped_column(Numeric(15, 4), nullable=False)
    recorded_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    asset: Mapped['Assets'] = relationship('Assets', back_populates='asset_history')


class Transactions(Base):
    __tablename__ = 'transactions'
    __table_args__ = (
        ForeignKeyConstraint(['account_id'], ['accounts.account_id'], name='transactions_account_id_fkey'),
        PrimaryKeyConstraint('transaction_id', name='transactions_pkey')
    )

    transaction_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    account_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    amount: Mapped[decimal.Decimal] = mapped_column(Numeric(15, 2), nullable=False)
    transaction_type: Mapped[str] = mapped_column(String(20), nullable=False)
    transaction_date: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)
    category: Mapped[Optional[str]] = mapped_column(String(50))
    merchant: Mapped[Optional[str]] = mapped_column(String(100))

    account: Mapped['Accounts'] = relationship('Accounts', back_populates='transactions')
    fraud_alerts: Mapped[list['FraudAlerts']] = relationship('FraudAlerts', back_populates='transaction')
    risk_assessment_logs: Mapped[list['RiskAssessmentLogs']] = relationship('RiskAssessmentLogs', back_populates='transaction')


class FraudAlerts(Base):
    __tablename__ = 'fraud_alerts'
    __table_args__ = (
        CheckConstraint("status::text = ANY (ARRAY['OPEN'::character varying, 'REVIEWED'::character varying, 'CLOSED'::character varying]::text[])", name='fraud_alerts_status_check'),
        ForeignKeyConstraint(['transaction_id'], ['transactions.transaction_id'], name='fraud_alerts_transaction_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='fraud_alerts_user_id_fkey'),
        PrimaryKeyConstraint('fraud_id', name='fraud_alerts_pkey')
    )

    fraud_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    transaction_id: Mapped[Optional[int]] = mapped_column(BigInteger)
    fraud_type: Mapped[Optional[str]] = mapped_column(String(100))
    risk_score: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(5, 2))
    status: Mapped[Optional[str]] = mapped_column(String(20))
    detected_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    transaction: Mapped[Optional['Transactions']] = relationship('Transactions', back_populates='fraud_alerts')
    user: Mapped['Users'] = relationship('Users', back_populates='fraud_alerts')


class RiskAssessmentLogs(Base):
    __tablename__ = 'risk_assessment_logs'
    __table_args__ = (
        CheckConstraint('risk_score >= 0 AND risk_score <= 100', name='risk_assessment_logs_risk_score_check'),
        ForeignKeyConstraint(['transaction_id'], ['transactions.transaction_id'], name='risk_assessment_logs_transaction_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['users.user_id'], name='risk_assessment_logs_user_id_fkey'),
        PrimaryKeyConstraint('assessment_id', name='risk_assessment_logs_pkey')
    )

    assessment_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)
    decision_taken: Mapped[str] = mapped_column(String(50), nullable=False)
    transaction_id: Mapped[Optional[int]] = mapped_column(BigInteger)
    explanation_text: Mapped[Optional[str]] = mapped_column(Text)
    input_signals: Mapped[Optional[dict]] = mapped_column(JSONB)
    model_version: Mapped[Optional[str]] = mapped_column(String(50))
    assessed_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    transaction: Mapped[Optional['Transactions']] = relationship('Transactions', back_populates='risk_assessment_logs')
    user: Mapped['Users'] = relationship('Users', back_populates='risk_assessment_logs')
