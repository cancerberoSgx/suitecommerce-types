
export async function loadScriptBrowser(path='jquery.js'){
  return new Promise(resolve=>{ 
    const s = document.createElement('script')
    s.src = path
    s.onload = ()=>resolve(true)
    s.onerror= ()=>resolve(false)
    document.head.appendChild(s)
  })
}