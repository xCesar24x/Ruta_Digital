import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  LayoutDashboard, Settings, Bell, Search, Plus, MoreVertical, 
  Calendar, User, Briefcase, X, Edit2, Trash2, CheckCircle2, 
  Mail, Phone, ExternalLink, TrendingUp, DollarSign, CreditCard, ToggleRight, Lock 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import './AdminDashboard.css';

// --- DATOS INICIALES ---
const initialTasks = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Rediseño Web Oropendola', client: 'Oropendola', date: '2026-10-15', value: '1200', tag: 'Web' },
    'task-2': { id: 'task-2', title: 'App Móvil Gym Aldenaire', client: 'Gym Aldenaire', date: '2026-11-02', value: '3500', tag: 'App' },
    'task-3': { id: 'task-3', title: 'Campaña Ads Noviembre', client: 'Grúas Greivin', date: '2026-10-20', value: '800', tag: 'Marketing' },
    'task-4': { id: 'task-4', title: 'SEO Optimización', client: 'Mrs Jhons Barbier', date: '2026-10-10', value: '450', tag: 'SEO' },
    'task-5': { id: 'task-5', title: 'Mantenimiento Mensual', client: 'Sr & Sra Pinto', date: '2026-10-30', value: '300', tag: 'Soporte' },
    'task-6': { id: 'task-6', title: 'Sistema Reservas', client: 'Cabañas del Bosque', date: '2026-12-01', value: '2100', tag: 'Web' },
  },
  columns: {
    'column-1': { id: 'column-1', title: 'Prospectos', taskIds: ['task-3'] },
    'column-2': { id: 'column-2', title: 'En Negociación', taskIds: ['task-6'] },
    'column-3': { id: 'column-3', title: 'Desarrollo', taskIds: ['task-1', 'task-2'] },
    'column-4': { id: 'column-4', title: 'En Revisión', taskIds: ['task-4'] },
    'column-5': { id: 'column-5', title: 'Completado', taskIds: ['task-5'] },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
};

const initialClients = [
  { id: 1, name: 'César Ugalde', company: 'Grúas Greivin', email: 'contacto@gruasgreivin.com', phone: '+506 8888-8888', status: 'Activo', spent: 3200 },
  { id: 2, name: 'María José', company: 'Gym Aldenaire', email: 'info@gym-aldenaire.com', phone: '+506 7777-7777', status: 'Activo', spent: 4500 },
  { id: 3, name: 'John Doe', company: 'Mrs Jhons Barbier', email: 'john@barbier.com', phone: '+506 6666-6666', status: 'Inactivo', spent: 1200 },
  { id: 4, name: 'Elena Pinto', company: 'Sr & Sra Pinto', email: 'elena@srysrapinto.com', phone: '+506 5555-5555', status: 'Activo', spent: 2800 },
  { id: 5, name: 'Carlos Bosque', company: 'Cabañas del Bosque', email: 'reservas@cabanas.com', phone: '+506 4444-4444', status: 'Prospecto', spent: 0 },
];

const financeData = [
  { name: 'Ene', ingresos: 4000, gastos: 2400 },
  { name: 'Feb', ingresos: 3000, gastos: 1398 },
  { name: 'Mar', ingresos: 2000, gastos: 9800 },
  { name: 'Abr', ingresos: 2780, gastos: 3908 },
  { name: 'May', ingresos: 1890, gastos: 4800 },
  { name: 'Jun', ingresos: 2390, gastos: 3800 },
  { name: 'Jul', ingresos: 3490, gastos: 4300 },
  { name: 'Ago', ingresos: 5490, gastos: 3100 },
  { name: 'Sep', ingresos: 6200, gastos: 2800 },
  { name: 'Oct', ingresos: 7100, gastos: 3200 },
];

// --- UTILIDADES ---
const getTagColor = (tag) => {
  switch (tag) {
    case 'Web': return 'tag-web';
    case 'App': return 'tag-app';
    case 'Marketing': return 'tag-marketing';
    case 'SEO': return 'tag-seo';
    case 'Soporte': return 'tag-default';
    default: return 'tag-default';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Activo': return 'status-active';
    case 'Inactivo': return 'status-inactive';
    case 'Prospecto': return 'status-prospect';
    default: return 'status-default';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Sin fecha';
  try {
    // Handling YYYY-MM-DD safely
    const [year, month, day] = dateString.split('-');
    if (year && month && day) {
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateString;
  } catch (e) {
    return dateString;
  }
};

export default function AdminDashboard() {
  // States
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('rutaDigitalCrm');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('rutaDigitalClients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [activeTab, setActiveTab] = useState('proyectos');
  const [activeSettingsTab, setActiveSettingsTab] = useState('perfil');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('rutaAdminAuth') === 'true');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [filterTag, setFilterTag] = useState('Todos');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', client: '', value: '', tag: 'Web', date: '' });
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('rutaDigitalCrm', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('rutaDigitalClients', JSON.stringify(clients));
  }, [clients]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.task-menu-container') && !e.target.closest('.notification-container') && !e.target.closest('.client-menu-container')) {
        setActiveDropdownId(null);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // --- KANBAN LOGIC ---
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData({ ...data, columns: { ...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish } });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newId = `task-${Date.now()}`;
    const newTaskObj = {
      id: newId,
      ...newTask,
      value: newTask.value.replace(/[^0-9]/g, '') || '0'
    };

    const newColumn = {
      ...data.columns['column-1'], 
      taskIds: [newId, ...data.columns['column-1'].taskIds]
    };

    setData({
      ...data,
      tasks: { ...data.tasks, [newId]: newTaskObj },
      columns: { ...data.columns, 'column-1': newColumn }
    });

    setIsModalOpen(false);
    setNewTask({ title: '', client: '', value: '', tag: 'Web', date: '' });
  };

  const handleDeleteTask = (taskId, columnId) => {
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newColumnTaskIds = data.columns[columnId].taskIds.filter(id => id !== taskId);
    
    setData({
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: newColumnTaskIds
        }
      }
    });
    setActiveDropdownId(null);
  };

  // --- RENDERERS ---

  const renderProyectos = () => (
    <div className="board-container fade-in">
      <div className="board-header">
        <div>
          <h1>Tablero CRM</h1>
          <p>Gestiona el flujo de trabajo de tus proyectos</p>
        </div>
        <div className="board-filters">
          <select className="filter-select" value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
            <option value="Todos">Todos los servicios</option>
            <option value="Web">Desarrollo Web</option>
            <option value="App">Aplicaciones</option>
            <option value="Marketing">Marketing</option>
            <option value="SEO">SEO</option>
            <option value="Soporte">Soporte</option>
          </select>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds
              .map(taskId => data.tasks[taskId])
              .filter(task => {
                const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      task.client.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesTag = filterTag === 'Todos' || task.tag === filterTag;
                return matchesSearch && matchesTag;
              });

            return (
              <div key={column.id} className="kanban-column">
                <div className="column-header">
                  <h3>{column.title}</h3>
                  <span className="task-count">{tasks.length}</span>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className={`task-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="task-card-header">
                                <span className={`task-tag ${getTagColor(task.tag)}`}>{task.tag}</span>
                                
                                <div className="task-menu-container">
                                  <button 
                                    className="icon-btn-small"
                                    onClick={() => setActiveDropdownId(activeDropdownId === task.id ? null : task.id)}
                                  >
                                    <MoreVertical size={16} />
                                  </button>
                                  {activeDropdownId === task.id && (
                                    <div className="task-dropdown">
                                      <button onClick={() => handleDeleteTask(task.id, column.id)} className="dropdown-item text-red">
                                        <Trash2 size={14} /> Eliminar
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <h4 className="task-title">{task.title}</h4>
                              <p className="task-client">{task.client}</p>
                              <div className="task-card-footer">
                                <div className="task-meta">
                                  <Calendar size={14} />
                                  <span>{formatDate(task.date)}</span>
                                </div>
                                <div className="task-value">${parseInt(String(task.value).replace(/\D/g, '') || 0).toLocaleString()}</div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );

  const renderClientes = () => {
    const filteredClients = clients.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="module-container fade-in">
        <div className="module-header">
          <div>
            <h1>Directorio de Clientes</h1>
            <p>Gestiona tu base de datos y contactos</p>
          </div>
          <button className="btn-secondary"><Plus size={16} /> Nuevo Cliente</button>
        </div>

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Estado</th>
                <th>Total Invertido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td>
                    <div className="td-client-info">
                      <div className="avatar">{client.name.charAt(0)}</div>
                      <div>
                        <strong>{client.company}</strong>
                        <span>{client.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="td-contact">
                      <span><Mail size={12}/> {client.email}</span>
                      <span><Phone size={12}/> {client.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td><strong className="text-green">${client.spent.toLocaleString()}</strong></td>
                  <td>
                    <div className="td-actions">
                      <button className="icon-btn-small"><Edit2 size={16} /></button>
                      <button className="icon-btn-small text-red"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderFinanzas = () => (
    <div className="module-container fade-in">
      <div className="module-header">
        <div>
          <h1>Finanzas y Reportes</h1>
          <p>Visión general del rendimiento y proyecciones</p>
        </div>
        <button className="btn-secondary">Exportar CSV</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-green-light"><TrendingUp size={24} className="text-green" /></div>
          <div className="stat-details">
            <span className="stat-label">Ingresos Totales (YTD)</span>
            <h3 className="stat-value">$37,840</h3>
            <span className="stat-change positive">+14% vs mes anterior</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-blue-light"><DollarSign size={24} className="text-blue" /></div>
          <div className="stat-details">
            <span className="stat-label">Pendiente por Cobrar</span>
            <h3 className="stat-value">$4,200</h3>
            <span className="stat-change">3 facturas pendientes</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-red-light"><CreditCard size={24} className="text-red" /></div>
          <div className="stat-details">
            <span className="stat-label">Gastos Operativos</span>
            <h3 className="stat-value">$2,100</h3>
            <span className="stat-change negative">-2% vs mes anterior</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Flujo de Caja Anual</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="ingresos" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Gastos por Categoría</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData.slice(6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="gastos" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAjustes = () => (
    <div className="module-container fade-in">
      <div className="module-header">
        <div>
          <h1>Ajustes del Sistema</h1>
          <p>Configura tu cuenta y las preferencias del CRM</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-nav">
          <button className={`settings-tab ${activeSettingsTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveSettingsTab('perfil')}>Perfil de Empresa</button>
          <button className={`settings-tab ${activeSettingsTab === 'seguridad' ? 'active' : ''}`} onClick={() => setActiveSettingsTab('seguridad')}>Seguridad</button>
          <button className={`settings-tab ${activeSettingsTab === 'notificaciones' ? 'active' : ''}`} onClick={() => setActiveSettingsTab('notificaciones')}>Notificaciones</button>
          <button className={`settings-tab ${activeSettingsTab === 'integraciones' ? 'active' : ''}`} onClick={() => setActiveSettingsTab('integraciones')}>Integraciones</button>
        </div>
        
        <div className="settings-content">
          {activeSettingsTab === 'perfil' && (
            <div className="fade-in">
              <div className="settings-section">
                <h3>Información General</h3>
                <div className="form-group">
                  <label>Nombre de la Empresa</label>
                  <input type="text" defaultValue="Ruta Digital" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Correo de Contacto</label>
                    <input type="email" defaultValue="contacto@rutadigital.com" />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input type="text" defaultValue="+506 8888-8888" />
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h3>Preferencias Visuales</h3>
                <div className="setting-toggle">
                  <div>
                    <h4>Modo Oscuro</h4>
                    <p>Mantener el panel siempre en modo oscuro</p>
                  </div>
                  <ToggleRight size={32} className="text-green" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <h4>Animaciones Fluidas</h4>
                    <p>Activar transiciones y efectos visuales</p>
                  </div>
                  <ToggleRight size={32} className="text-green" />
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-primary">Guardar Cambios</button>
              </div>
            </div>
          )}

          {activeSettingsTab === 'seguridad' && (
            <div className="fade-in">
              <div className="settings-section">
                <h3>Seguridad de la Cuenta</h3>
                <div className="form-group">
                  <label>Contraseña Actual</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nueva Contraseña</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                  <div className="form-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              <div className="settings-section">
                <h3>Autenticación en dos pasos (2FA)</h3>
                <div className="setting-toggle">
                  <div>
                    <h4>Activar 2FA</h4>
                    <p>Protege tu cuenta con un código temporal</p>
                  </div>
                  <ToggleRight size={32} className="text-gray" color="#71717a" />
                </div>
              </div>
              <div className="settings-actions">
                <button className="btn-primary">Actualizar Seguridad</button>
              </div>
            </div>
          )}

          {activeSettingsTab === 'notificaciones' && (
            <div className="fade-in">
              <div className="settings-section">
                <h3>Preferencias de Notificaciones</h3>
                <div className="setting-toggle">
                  <div>
                    <h4>Nuevos Proyectos</h4>
                    <p>Recibir un correo cuando se registre un nuevo proyecto</p>
                  </div>
                  <ToggleRight size={32} className="text-green" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <h4>Cambios de Estado</h4>
                    <p>Recibir notificaciones cuando un proyecto cambie de etapa</p>
                  </div>
                  <ToggleRight size={32} className="text-green" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <h4>Resumen Semanal</h4>
                    <p>Recibir un reporte financiero todos los lunes</p>
                  </div>
                  <ToggleRight size={32} className="text-gray" color="#71717a" />
                </div>
              </div>
            </div>
          )}

          {activeSettingsTab === 'integraciones' && (
            <div className="fade-in">
              <div className="settings-section">
                <h3>Integraciones de Terceros</h3>
                <div className="setting-toggle">
                  <div>
                    <h4>Slack</h4>
                    <p>Enviar notificaciones del CRM a un canal de Slack</p>
                  </div>
                  <button className="btn-secondary">Conectar</button>
                </div>
                <div className="setting-toggle">
                  <div>
                    <h4>Google Calendar</h4>
                    <p>Sincronizar fechas de entrega de proyectos</p>
                  </div>
                  <button className="btn-secondary">Conectar</button>
                </div>
                <div className="setting-toggle">
                  <div>
                    <h4>Stripe</h4>
                    <p>Vincular facturación y cobros automáticos</p>
                  </div>
                  <button className="btn-secondary">Conectar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'Cesar24' && loginForm.password === 'Cesaramr24') {
      setIsAuthenticated(true);
      localStorage.setItem('rutaAdminAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container fade-in">
        <div className="login-box">
          <div className="login-logo">
            <img src="/logo.png" alt="Ruta Digital" />
            <h2>Ruta Digital CRM</h2>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Usuario</label>
              <input 
                type="text" 
                required
                value={loginForm.username} 
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} 
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                required
                value={loginForm.password} 
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Ruta Digital" className="sidebar-logo-img" />
          <h2>Ruta Digital</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'proyectos' ? 'active' : ''}`}
            onClick={() => setActiveTab('proyectos')}
          >
            <LayoutDashboard size={20} />
            <span>Proyectos</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'clientes' ? 'active' : ''}`}
            onClick={() => setActiveTab('clientes')}
          >
            <User size={20} />
            <span>Clientes</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'finanzas' ? 'active' : ''}`}
            onClick={() => setActiveTab('finanzas')}
          >
            <Briefcase size={20} />
            <span>Finanzas</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'ajustes' ? 'active' : ''}`}
            onClick={() => setActiveTab('ajustes')}
          >
            <Settings size={20} />
            <span>Ajustes</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="user-profile">
            <img src="https://ui-avatars.com/api/?name=Cesar24&background=16a34a&color=fff" alt="Cesar24" />
            <div className="user-info">
              <span className="user-name">Cesar</span>
              <button 
                onClick={() => { setIsAuthenticated(false); localStorage.removeItem('rutaAdminAuth'); }}
                style={{ background: 'transparent', border: 'none', color: '#f87171', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-header">
          <div className="header-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar proyectos, clientes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-actions">
            {activeTab === 'proyectos' && (
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                <Plus size={18} />
                Nuevo Proyecto
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        {activeTab === 'proyectos' && renderProyectos()}
        {activeTab === 'clientes' && renderClientes()}
        {activeTab === 'finanzas' && renderFinanzas()}
        {activeTab === 'ajustes' && renderAjustes()}

        {/* Add Project Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Crear Nuevo Proyecto</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCreateProject} className="modal-form">
                <div className="form-group">
                  <label>Nombre del Proyecto</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. E-commerce Zapatería"
                    value={newTask.title}
                    onChange={e => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Cliente</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Zapatería El Paso"
                    value={newTask.client}
                    onChange={e => setNewTask({...newTask, client: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Servicio</label>
                    <select 
                      value={newTask.tag}
                      onChange={e => setNewTask({...newTask, tag: e.target.value})}
                    >
                      <option value="Web">Desarrollo Web</option>
                      <option value="App">Aplicación Móvil</option>
                      <option value="Marketing">Marketing Digital</option>
                      <option value="SEO">SEO</option>
                      <option value="Soporte">Soporte y Mantenimiento</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Valor (USD)</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="1500"
                      value={newTask.value}
                      onChange={e => setNewTask({...newTask, value: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Fecha de Entrega / Inicio</label>
                  <input 
                    type="date" 
                    required
                    value={newTask.date}
                    onChange={e => setNewTask({...newTask, date: e.target.value})}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="btn-primary">Guardar Proyecto</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
