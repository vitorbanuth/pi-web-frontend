import { useState, useEffect } from 'react'
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userService'
import { fetchPatients } from '../services/patientService'

const emptyForm = { username: '', email: '', password: '', patientId: '' }

function UserList() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [confirmTarget, setConfirmTarget] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    Promise.all([fetchUsers(), fetchPatients()])
      .then(([u, p]) => { setUsers(u); setPatients(p) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const patientName = (id) => patients.find(p => p.id === id)?.name ?? '—'

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  function openCreate() {
    setForm(emptyForm)
    setEditTarget(null)
    setShowModal(true)
  }

  function handleEdit(u) {
    setForm({
      username: u.username,
      email: u.email,
      password: '',
      patientId: u.patientId,
    })
    setEditTarget(u.id)
    setShowModal(true)
  }

  function handleDelete(u) {
    setConfirmTarget({ id: u.id, name: u.username })
  }

  async function confirmDelete() {
    const { id } = confirmTarget
    setConfirmTarget(null)
    setDeletingId(id)
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (e) {
      setToast(e.message)
      setTimeout(() => setToast(null), 4000)
    } finally {
      setDeletingId(null)
    }
  }

  async function handleSave() {
    if (!form.username.trim() || !form.email.trim()) return
    if (!editTarget) {
      if (!form.password || !form.patientId) return
    }
    setSaving(true)
    try {
      if (editTarget) {
        const updated = await updateUser(editTarget, form)
        setUsers(prev => prev.map(u => u.id === editTarget ? updated : u))
      } else {
        const created = await createUser(form)
        setUsers(prev => [created, ...prev])
      }
      setForm(emptyForm)
      setEditTarget(null)
      setShowModal(false)
    } catch (e) {
      setToast(e.message)
      setTimeout(() => setToast(null), 4000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-stone-400 text-sm">Carregando usuários...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">Erro ao carregar usuários: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <span>⚠️ {toast}</span>
          <button onClick={() => setToast(null)} className="text-red-400 hover:text-red-600 font-bold leading-none">✕</button>
        </div>
      )}

      {/* Dialog de confirmação de exclusão */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4">
            <h2 className="text-base font-semibold text-stone-800">Remover usuário</h2>
            <p className="text-sm text-stone-500">
              Tem certeza que deseja remover <span className="font-medium text-stone-700">{confirmTarget.name}</span>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setConfirmTarget(null)}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-base font-semibold text-stone-800">
              {editTarget ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Usuário *</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                  placeholder="Ex: joao.silva"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">E-mail *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                  placeholder="email@exemplo.com"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Senha {editTarget ? <span className="text-stone-400 font-normal">(deixe em branco para manter)</span> : '*'}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                  placeholder="Mínimo 6 caracteres"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Paciente vinculado {editTarget ? '' : '*'}
                </label>
                <select
                  value={form.patientId}
                  onChange={e => setForm({ ...form, patientId: e.target.value })}
                  className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 text-stone-700"
                >
                  <option value="">Selecionar paciente...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm); setEditTarget(null) }}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-40"
                style={{ background: '#ea580c' }}
              >
                {saving ? 'Salvando...' : editTarget ? 'Salvar alterações' : 'Criar usuário'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Buscar por usuário ou e-mail..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-orange-200 rounded-lg px-4 py-2 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-orange-400 w-72"
        />
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-medium text-white rounded-lg"
          style={{ background: '#ea580c' }}
        >
          + Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-xl border border-orange-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-orange-100 bg-orange-50">
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Usuário</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">E-mail</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Paciente vinculado</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-stone-50 last:border-0 hover:bg-orange-50/50">
                <td className="px-5 py-3 font-medium text-stone-800">{u.username || '—'}</td>
                <td className="px-5 py-3 text-stone-500">{u.email || '—'}</td>
                <td className="px-5 py-3 text-stone-500">
                  {u.patientId ? (
                    <span>{patientName(u.patientId)}</span>
                  ) : (
                    <span className="text-stone-300">—</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleEdit(u)}
                      className="text-stone-300 hover:text-orange-500 transition-colors"
                      title="Editar usuário"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(u)}
                      disabled={deletingId === u.id}
                      className="text-stone-300 hover:text-red-500 transition-colors disabled:opacity-40"
                      title="Remover usuário"
                    >
                      {deletingId === u.id ? '...' : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 py-10 text-sm">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  )
}

export default UserList
