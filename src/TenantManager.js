import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function TenantManager() {
  const [tenants, setTenants] = useState([])
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', id_card_number: '' })
  const [editingTenant, setEditingTenant] = useState(null)

  useEffect(() => {
    fetchTenants()
  }, [])

  const fetchTenants = async () => {
    const { data, error } = await supabase.from('tenants').select('*')
    if (error) alert('โหลดข้อมูลผู้เช่าล้มเหลว')
    else setTenants(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('tenants').insert([form])
    if (error) alert('เพิ่มข้อมูลผู้เช่าล้มเหลว')
    else {
      setForm({ full_name: '', phone: '', email: '', id_card_number: '' })
      fetchTenants()
    }
  }

  const handleEdit = (tenant) => {
    setEditingTenant(tenant)
    setForm({
      full_name: tenant.full_name,
      phone: tenant.phone,
      email: tenant.email,
      id_card_number: tenant.id_card_number
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('tenants')
      .update(form)
      .eq('id', editingTenant.id)

    if (error) alert('แก้ไขข้อมูลผู้เช่าล้มเหลว')
    else {
      setEditingTenant(null)
      setForm({ full_name: '', phone: '', email: '', id_card_number: '' })
      fetchTenants()
    }
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('tenants').delete().eq('id', id)
    if (error) alert('ลบข้อมูลผู้เช่าล้มเหลว')
    else fetchTenants()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👤 จัดการผู้เช่า</h2>
      <form onSubmit={editingTenant ? handleUpdate : handleSubmit}>
        <input name="full_name" placeholder="ชื่อ-นามสกุล" value={form.full_name} onChange={handleChange} required />
        <input name="phone" placeholder="เบอร์โทร" value={form.phone} onChange={handleChange} required />
        <input name="email" placeholder="อีเมล" value={form.email} onChange={handleChange} />
        <input name="id_card_number" placeholder="เลขบัตรประชาชน" value={form.id_card_number} onChange={handleChange} />
        <button type="submit">{editingTenant ? 'อัปเดต' : 'เพิ่มผู้เช่า'}</button>
      </form>

      <h3 style={{ marginTop: '2rem' }}>📋 รายชื่อผู้เช่า</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>เบอร์โทร</th>
            <th>อีเมล</th>
            <th>เลขบัตร</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.full_name}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.email}</td>
              <td>{tenant.id_card_number}</td>
              <td>
                <button onClick={() => handleEdit(tenant)}>แก้ไข</button>
                <button onClick={() => handleDelete(tenant.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TenantManager