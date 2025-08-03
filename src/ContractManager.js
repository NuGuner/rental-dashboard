import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function ContractManager() {
  const [contracts, setContracts] = useState([])
  const [rooms, setRooms] = useState([])
  const [tenants, setTenants] = useState([])
  const [form, setForm] = useState({
    room_id: '',
    tenant_id: '',
    start_date: '',
    end_date: '',
    status: 'active'
  })
  const [editingContract, setEditingContract] = useState(null)

  useEffect(() => {
    fetchContracts()
    fetchRooms()
    fetchTenants()
  }, [])

  const fetchContracts = async () => {
    const { data, error } = await supabase.from('contracts').select('*')
    if (error) alert('โหลดข้อมูลสัญญาเช่าล้มเหลว')
    else setContracts(data)
  }

  const fetchRooms = async () => {
    const { data } = await supabase.from('rooms').select('id, room_name')
    setRooms(data)
  }

  const fetchTenants = async () => {
    const { data } = await supabase.from('tenants').select('id, full_name')
    setTenants(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('contracts').insert([form])
    if (error) alert('เพิ่มสัญญาเช่าล้มเหลว')
    else {
      setForm({ room_id: '', tenant_id: '', start_date: '', end_date: '', status: 'active' })
      fetchContracts()
    }
  }

  const handleEdit = (contract) => {
    setEditingContract(contract)
    setForm({
      room_id: contract.room_id,
      tenant_id: contract.tenant_id,
      start_date: contract.start_date,
      end_date: contract.end_date,
      status: contract.status
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('contracts')
      .update(form)
      .eq('id', editingContract.id)

    if (error) alert('แก้ไขสัญญาเช่าล้มเหลว')
    else {
      setEditingContract(null)
      setForm({ room_id: '', tenant_id: '', start_date: '', end_date: '', status: 'active' })
      fetchContracts()
    }
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('contracts').delete().eq('id', id)
    if (error) alert('ลบสัญญาเช่าล้มเหลว')
    else fetchContracts()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📄 จัดการสัญญาเช่า</h2>
      <form onSubmit={editingContract ? handleUpdate : handleSubmit}>
        <select name="room_id" value={form.room_id} onChange={handleChange} required>
          <option value="">เลือกห้อง</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>{room.room_name}</option>
          ))}
        </select>

        <select name="tenant_id" value={form.tenant_id} onChange={handleChange} required>
          <option value="">เลือกผู้เช่า</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>{tenant.full_name}</option>
          ))}
        </select>

        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">กำลังเช่า</option>
          <option value="expired">หมดอายุ</option>
          <option value="cancelled">ยกเลิก</option>
        </select>

        <button type="submit">{editingContract ? 'อัปเดตสัญญา' : 'เพิ่มสัญญา'}</button>
      </form>

      <h3 style={{ marginTop: '2rem' }}>📋 รายการสัญญาเช่า</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ห้อง</th>
            <th>ผู้เช่า</th>
            <th>เริ่ม</th>
            <th>หมด</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{rooms.find(r => r.id === contract.room_id)?.room_name}</td>
              <td>{tenants.find(t => t.id === contract.tenant_id)?.full_name}</td>
              <td>{contract.start_date}</td>
              <td>{contract.end_date}</td>
              <td>{contract.status}</td>
              <td>
                <button onClick={() => handleEdit(contract)}>แก้ไข</button>
                <button onClick={() => handleDelete(contract.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContractManager
