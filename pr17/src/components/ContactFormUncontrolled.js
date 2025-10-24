import React, { useRef } from 'react';

const ContactFormUncontrolled = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const subjectRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value
    };

    console.log('Данные формы (неуправляемая):', formData);
    alert('Форма обратной связи отправлена!');
    
    // Очистка формы
    nameRef.current.value = '';
    emailRef.current.value = '';
    subjectRef.current.value = '';
    messageRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Форма обратной связи (неуправляемая)</h2>
      
      <div>
        <label>Имя:</label>
        <input
          type="text"
          ref={nameRef}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          ref={emailRef}
          required
        />
      </div>

      <div>
        <label>Тема:</label>
        <select ref={subjectRef} required>
          <option value="">Выберите тему</option>
          <option value="question">Вопрос</option>
          <option value="feedback">Отзыв</option>
          <option value="support">Техподдержка</option>
        </select>
      </div>

      <div>
        <label>Сообщение:</label>
        <textarea
          ref={messageRef}
          required
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default ContactFormUncontrolled;