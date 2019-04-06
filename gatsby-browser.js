
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Cette application possède un mise à jour. ` +
      `Charger la dernière version ?`
  )

  if (answer === true) {
    window.location.reload()
  }
}