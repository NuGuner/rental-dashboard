import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function RoomManager() {
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState({ room_name: '', location: '', monthly_rent: '', status: 'available' })
  const [editingRoom, setEditingRoom] = useState(null)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    const { data, error } = await supabase.from('rooms').select('*')
    if (error) alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
    else setRooms(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('rooms').insert([form])
    if (error) alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล')
    else {
      setForm({ room_name: '', location: '', monthly_rent: '', status: 'available' })
      fetchRooms()
    }
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('rooms').delete().eq('id', id)
    if (error) alert('เกิดข้อผิดพลาดในการลบข้อมูล')
    else fetchRooms()
  }
  const handleEdit = (room) => {
  setEditingRoom(room)
  setForm({
    room_name: room.room_name,
    location: room.location,
    monthly_rent: room.monthly_rent,
    status: room.status
  })
}

const handleUpdate = async (e) => {
  e.preventDefault()
  const { error } = await supabase
    .from('rooms')
    .update(form)
    .eq('id', editingRoom.id)

  if (error) alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล')
  else {
    setEditingRoom(null)
    setForm({ room_name: '', location: '', monthly_rent: '', status: 'available' })
    fetchRooms()
  }
}

  return (
    <div style={{ padding: '2rem' }}>
      <h2>➕ เพิ่มห้องเช่า</h2>
      <form onSubmit={editingRoom ? handleUpdate : handleSubmit}>
        <input name="room_name" placeholder="ชื่อห้อง" value={form.room_name} onChange={handleChange} required />
        <input name="location" placeholder="ที่ตั้ง" value={form.location} onChange={handleChange} required />
        <input name="monthly_rent" placeholder="ค่าเช่า" value={form.monthly_rent} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="available">ว่าง</option>
          <option value="rented">มีผู้เช่า</option>
          <option value="maintenance">ปิดปรับปรุง</option>
        </select>
        <button type="submit">
			{editingRoom ? 'อัปเดตข้อมูล' : 'บันทึก'}
		</button>

      </form>

      <h2 style={{ marginTop: '2rem' }}>📋 รายการห้องเช่า</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ชื่อห้อง</th>
            <th>ที่ตั้ง</th>
            <th>ค่าเช่า</th>
            <th>สถานะ</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.room_name}</td>
              <td>{room.location}</td>
              <td>{room.monthly_rent}</td>
              <td>{room.status}</td>
              <td>
                <button onClick={() => handleEdit(room)}>แก้ไข</button>
				<button onClick={() => handleDelete(room.id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoomManager