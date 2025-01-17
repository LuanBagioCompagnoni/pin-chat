export function wrapPromise(promise) {
  let status = 'pending';
  let result;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender; // Suspense irá pausar aqui
      } else if (status === 'error') {
        throw result; // Lançará o erro
      } else if (status === 'success') {
        return result; // Retorna os dados resolvidos
      }
    },
  };
}
