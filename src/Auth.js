// Auth.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // login | signup | reset
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'login') {
        await onLogin({ username: email, password });
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccessMsg('สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันตัวตน');
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setSuccessMsg('ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลแล้ว');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{mode === 'login' ? 'เข้าสู่ระบบ' : mode === 'signup' ? 'สมัครสมาชิก' : 'รีเซ็ตรหัสผ่าน'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>
        {mode !== 'reset' && (
          <div>
            <label>รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 10 }}
            />
          </div>
        )}
        <button type="submit">
          {mode === 'login' ? 'เข้าสู่ระบบ' : mode === 'signup' ? 'สมัครสมาชิก' : 'รีเซ็ตรหัสผ่าน'}
        </button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      </form>

      <div style={{ marginTop: 20 }}>
        {mode !== 'login' && (
          <button onClick={() => setMode('login')}>กลับไปหน้าเข้าสู่ระบบ</button>
        )}
        {mode !== 'signup' && (
          <button onClick={() => setMode('signup')}>สมัครสมาชิก</button>
        )}
        {mode !== 'reset' && (
          <button onClick={() => setMode('reset')}>ลืมรหัสผ่าน?</button>
        )}
      </div>
    </div>
  );
};

export default Auth;
