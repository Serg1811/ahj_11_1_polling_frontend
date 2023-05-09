import {
  catchError, of, interval, mergeMap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import CreateNewMessage from './CreateNewMessage';

const mailBox = document.querySelector('.container-mail');

// const apiUrl = 'http://localhost:7075/messages/unread';
const apiUrl = 'https://ahj-11-1-polling-backend.onrender.com/messages/unread';

const messageView = new CreateNewMessage(mailBox);

const messagesIds = new Set();
const messages$ = interval(1000)
  .pipe(
    mergeMap(() => ajax.getJSON(apiUrl)
      .pipe(
        catchError((error) => {
          console.log('error: ', error);
          return of(null);
        }),
      )),
  );

messages$
  .subscribe({
    next: (value) => {
      const newMessages = value.messages.reduce((acc, message) => {
        if (messagesIds.has(message.id)) {
          return acc;
        }

        messagesIds.add(message.id);
        acc.push(message);
        return acc;
      }, []);

      for (const message of newMessages) {
        messageView.renderMessage(message);
      }
    },
    error: (err) => console.log(err),
  });
