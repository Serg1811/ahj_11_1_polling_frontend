import getCreationDate from './getCreationDate';

const LIMIT = 15;

export default class CreateNewMessage {
  constructor(conteiner) {
    this.container = conteiner;
  }

  renderMessage(item) {
    const listMessage = document.createElement('UL');
    const liEmail = document.createElement('LI');
    const paragraphEmail = document.createElement('P');
    const liSubject = document.createElement('LI');
    const paragraphSubject = document.createElement('P');
    const liCreated = document.createElement('LI');
    const paragraphCreated = document.createElement('P');

    listMessage.classList.add('list-message');
    listMessage.setAttribute('id', item.id);
    liEmail.classList.add('email');
    paragraphEmail.classList.add('email-text');

    liSubject.classList.add('subject');
    paragraphSubject.classList.add('subject-text');

    liCreated.classList.add('created');
    paragraphCreated.classList.add('date_of_creation');

    paragraphEmail.textContent = item.from;

    paragraphSubject.textContent = item.subject.length > LIMIT ? `${item.subject.slice(0, LIMIT)}...` : item.subject;
    paragraphCreated.textContent = getCreationDate(item.received);

    this.container.prepend(listMessage);
    listMessage.append(liEmail);
    listMessage.append(liSubject);
    listMessage.append(liCreated);
    liEmail.append(paragraphEmail);
    liSubject.append(paragraphSubject);
    liCreated.append(paragraphCreated);
  }
}
