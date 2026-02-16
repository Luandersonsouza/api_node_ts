import {server} from './server/server';

server.listen(process.env.PORT || 3000, () => {
  console.log(`Rodou, na porta ${process.env.PORT || 3000}!`);
});