import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MessageSquare, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Send 
} from 'lucide-react';
import './BookingModal.css';

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM'
];

const CONTACT_METHODS = [
  { id: 'meet', label: 'Google Meet', desc: 'Videollamada online', icon: Video },
  { id: 'whatsapp', label: 'WhatsApp', desc: 'Chat o llamada rápida', icon: MessageSquare },
  { id: 'phone', label: 'Llamada Directa', desc: 'Voz celular / teléfono', icon: PhoneCall }
];

const SERVICE_OPTIONS = [
  'Desarrollo Web & Apps',
  'Automatizaciones & IA',
  'Revenue & Dashboards',
  'Consultoría Integral'
];

const BookingModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  // Today reference
  const today = new Date();
  
  // State for calendar month navigation
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // Booking details state
  // Default selected date: tomorrow or Monday if tomorrow is Sunday
  const getInitialDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) { // Sunday -> move to Monday
      d.setDate(d.getDate() + 1);
    }
    return d;
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate);
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [selectedMethod, setSelectedMethod] = useState('meet');
  const [selectedService, setSelectedService] = useState('Desarrollo Web & Apps');
  const [clientName, setClientName] = useState('');

  // Animate modal on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      gsap.fromTo(modalRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", delay: 0.05 }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.25 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, delay: 0.05, onComplete: onClose });
  };

  // Calendar helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const isDateDisabled = (dayNumber) => {
    const checkDate = new Date(currentYear, currentMonth, dayNumber);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Disable past dates and Sundays (day 0)
    return checkDate < startOfToday || checkDate.getDay() === 0;
  };

  const isDateSelected = (dayNumber) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === dayNumber &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isDateToday = (dayNumber) => {
    return (
      today.getDate() === dayNumber &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const handleSelectDay = (dayNumber) => {
    if (isDateDisabled(dayNumber)) return;
    setSelectedDate(new Date(currentYear, currentMonth, dayNumber));
  };

  const formatSelectedDateHuman = (date) => {
    if (!date) return '';
    const dayOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][date.getDay()];
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    return `${dayOfWeek}, ${day} de ${month}`;
  };

  const handleConfirmWhatsApp = (e) => {
    e.preventDefault();

    const formattedDate = formatSelectedDateHuman(selectedDate);
    const methodName = CONTACT_METHODS.find(m => m.id === selectedMethod)?.label || 'Google Meet';
    const nameStr = clientName.trim() ? clientName.trim() : 'Cliente interesado';

    const message = `¡Hola Ruta Digital! 🚀

Me gustaría agendar una asesoría gratuita:

👤 *Nombre / Empresa:* ${nameStr}
📅 *Fecha sugerida:* ${formattedDate}
⏰ *Hora:* ${selectedTime}
💻 *Medio preferido:* ${methodName}
🎯 *Servicio de interés:* ${selectedService}

¿Tienen disponibilidad en ese espacio para coordinar? ¡Muchas gracias!`;

    const encodedMsg = encodeURIComponent(message);
    const phoneNumber = '50688226740';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMsg}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  // Render Calendar Grid
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);
  const calendarCells = [];

  // Empty cells before first day of month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    const disabled = isDateDisabled(d);
    const selected = isDateSelected(d);
    const isCurrentDay = isDateToday(d);

    calendarCells.push(
      <button
        key={`day-${d}`}
        type="button"
        className={`calendar-day ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${isCurrentDay ? 'is-today' : ''}`}
        onClick={() => handleSelectDay(d)}
        disabled={disabled}
        aria-label={`${d} de ${MONTH_NAMES[currentMonth]}`}
      >
        <span className="day-number">{d}</span>
        {isCurrentDay && <span className="today-dot"></span>}
      </button>
    );
  }

  const isPrevDisabled = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div className="booking-modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div 
        className="booking-modal-container" 
        ref={modalRef} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="booking-modal-glow"></div>

        {/* Modal Header */}
        <div className="booking-modal-header">
          <div className="booking-header-title-box">
            <div className="booking-badge">
              <Sparkles size={13} className="badge-icon" />
              <span>Agenda Rápida • 100% Gratuita</span>
            </div>
            <h2 className="booking-title">Agendar Asesoría Estratégica</h2>
            <p className="booking-subtitle">
              Elige tu fecha, hora y canal. Te conectamos de inmediato con nuestros fundadores.
            </p>
          </div>
          <button 
            className="booking-close-btn" 
            onClick={handleClose} 
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Form */}
        <form className="booking-modal-form" onSubmit={handleConfirmWhatsApp}>
          
          <div className="booking-modal-scroll-area custom-scrollbar">
            <div className="booking-grid-layout">
              
              {/* LEFT COLUMN: Mini Calendar */}
              <div className="booking-section-card">
                <div className="section-label-row">
                  <CalendarIcon size={16} className="section-icon" />
                  <span className="section-title">1. Selecciona el Día</span>
                </div>

                {/* Month Navigation */}
                <div className="calendar-header-nav">
                  <span className="current-month-label">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </span>
                  <div className="calendar-nav-buttons">
                    <button 
                      type="button" 
                      className="cal-nav-btn" 
                      onClick={handlePrevMonth} 
                      disabled={isPrevDisabled}
                      aria-label="Mes anterior"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="cal-nav-btn" 
                      onClick={handleNextMonth} 
                      aria-label="Mes siguiente"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Day Headers (Dom, Lun, ...) */}
                <div className="calendar-weekdays">
                  {DAY_NAMES.map((name, i) => (
                    <span key={i} className={`weekday-name ${i === 0 ? 'sunday' : ''}`}>
                      {name}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="calendar-days-grid">
                  {calendarCells}
                </div>

                {/* Selected date confirmation pill */}
                <div className="selected-date-summary">
                  <span className="summary-label">Fecha seleccionada:</span>
                  <strong className="summary-val">{formatSelectedDateHuman(selectedDate)}</strong>
                </div>
              </div>

              {/* RIGHT COLUMN: Time Slots & Contact Method */}
              <div className="booking-details-column">
                
                {/* 2. Horario */}
                <div className="booking-section-card">
                  <div className="section-label-row">
                    <Clock size={16} className="section-icon" />
                    <span className="section-title">2. Hora Preferida</span>
                  </div>
                  <div className="time-slots-grid">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time-chip ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock size={12} className="time-icon" />
                        <span>{time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Medio de Comunicación */}
                <div className="booking-section-card">
                  <div className="section-label-row">
                    <Video size={16} className="section-icon" />
                    <span className="section-title">3. Medio de Comunicación</span>
                  </div>
                  <div className="methods-grid">
                    {CONTACT_METHODS.map((method) => {
                      const MethodIcon = method.icon;
                      const isSelected = selectedMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          className={`method-card ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <div className="method-icon-wrap">
                            <MethodIcon size={16} />
                          </div>
                          <div className="method-text">
                            <span className="method-title">{method.label}</span>
                            <span className="method-desc">{method.desc}</span>
                          </div>
                          {isSelected && <Check size={14} className="method-check" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Nombre y Servicio */}
                <div className="booking-section-card">
                  <div className="section-label-row">
                    <Sparkles size={16} className="section-icon" />
                    <span className="section-title">4. Tus Datos (Opcional)</span>
                  </div>
                  
                  <div className="input-group-row">
                    <div className="input-wrap">
                      <label htmlFor="booking-name" className="input-label">Nombre o Empresa</label>
                      <input
                        id="booking-name"
                        type="text"
                        className="booking-input"
                        placeholder="Ej. Sofía Castro / Startup"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>

                    <div className="input-wrap">
                      <label htmlFor="booking-service" className="input-label">Interés Principal</label>
                      <select
                        id="booking-service"
                        className="booking-select"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="select-opt">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="booking-modal-footer">
            <div className="footer-summary-text">
              <span>Se abrirá WhatsApp con los detalles listos para enviar en 1 clic.</span>
            </div>

            <button type="submit" className="booking-submit-btn">
              <Send size={18} />
              <span>Confirmar y Enviar por WhatsApp</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookingModal;
