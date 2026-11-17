import React,{useEffect,useMemo,useState} from 'react'
import {createRoot} from 'react-dom/client'
import {supabase,configured} from './lib/supabase.js'
import {domains,resources} from './data/resources.js'
import './styles.css'
const types=['All','Lab','Read','Video','Practice']
const redirectURL=()=>new URL(import.meta.env.BASE_URL,window.location.origin).href
function Login(){
 const [email,setEmail]=useState(''),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[error,setError]=useState('')
 async function submit(e){e.preventDefault();setBusy(true);setError('');setNotice('')
  const {error:err}=await supabase.auth.signInWithOtp({email:email.trim(),options:{emailRedirectTo:redirectURL()}})
  if(err)setError(err.message);else setNotice('Sign-in link sent. Open your email on this device.')
  setBusy(false)
 }
 return <main className="login"><div className="login-card"><div className="mark">✦</div><p className="eyebrow">YOUR LEARNING SPACE</p><h1>Study smarter.<br/><em>Lab more.</em></h1><p className="muted">Your SC-300 labs, videos, reading, and private cloud-synced progress.</p><form onSubmit={submit}><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/><button className="primary" disabled={busy}>{busy?'Sending…':'Send sign-in link →'}</button></form>{notice&&<p className="notice">{notice}</p>}{error&&<p className="error">{error}</p>}<p className="hint">🔒 No password needed. Only you can read your saved progress.</p></div></main>
}
function Dashboard({session}){
 const [done,setDone]=useState({}),[loaded,setLoaded]=useState(false),[error,setError]=useState(''),[saving,setSaving]=useState('')
 const [domain,setDomain]=useState('all'),[kind,setKind]=useState('All'),[query,setQuery]=useState('')
 const uid=session.user.id
 async function refresh(){const {data,error:e}=await supabase.from('study_progress').select('item_id,completed_at').eq('user_id',uid)
  if(e){setError('Could not load progress: '+e.message);return}setDone(Object.fromEntries((data||[]).map(x=>[x.item_id,x.completed_at])));setError('');setLoaded(true)}
 useEffect(()=>{let active=true;(async()=>{const {data,error:e}=await supabase.from('study_progress').select('item_id,completed_at').eq('user_id',uid)
  if(!active)return;if(e)setError('Could not load progress: '+e.message);else{setDone(Object.fromEntries((data||[]).map(x=>[x.item_id,x.completed_at])));setLoaded(true)}})()
  return()=>{active=false}
 },[uid])
 async function toggle(item){if(!loaded||saving)return;setSaving(item.id);setError('')
  const completed=Boolean(done[item.id])
  const result=completed?await supabase.from('study_progress').delete().eq('user_id',uid).eq('item_id',item.id):
   await supabase.from('study_progress').upsert({user_id:uid,item_id:item.id,completed_at:new Date().toISOString()},{onConflict:'user_id,item_id'})
  if(result.error)setError('Save failed: '+result.error.message)
  else setDone(prev=>{const next={...prev};if(completed)delete next[item.id];else next[item.id]=new Date().toISOString();return next})
  setSaving('')
 }
 const filtered=useMemo(()=>resources.filter(r=>(domain==='all'||r.domain===domain)&&(kind==='All'||r.kind===kind)&&((r.title+' '+r.detail+' '+r.source).toLowerCase().includes(query.toLowerCase()))),[domain,kind,query])
 const count=resources.filter(r=>done[r.id]).length
 const pct=Math.round(count/resources.length*100)
 const next=resources.find(r=>r.kind==='Lab'&&!done[r.id])||resources.find(r=>!done[r.id])
 return <div className="layout"><aside className="sidebar"><div className="brand"><div className="mark">✦</div><div><strong>STUDY / OS</strong><small>Identity Administrator</small></div></div><p className="eyebrow">YOUR CERTIFICATION</p><nav><button className={domain==='all'?'active':''} onClick={()=>setDomain('all')}>◎ &nbsp; Overview</button>{domains.map((d,i)=><button className={domain===d.id?'active':''} key={d.id} onClick={()=>setDomain(d.id)}><span className="num">0{i+1}</span> {d.name}</button>)}</nav><div className="account"><span className="muted" title={session.user.email}>{session.user.email}</span><button onClick={()=>supabase.auth.signOut()}>Sign out ↗</button></div></aside><main className="content"><header className="header"><div><p className="eyebrow">MICROSOFT CERTIFICATIONS / SC-300</p><h1>Study Command Center</h1><p className="muted">Hands-on first. Small sessions. Real progress.</p></div><div className="sync">☁ {saving?'Saving…':loaded?'Cloud sync active':'Loading…'} <button title="Refresh progress from cloud" onClick={refresh}>↻</button></div></header>{error&&<p className="error">{error}</p>}
 <section className="stats"><div className="stat"><small>YOUR PROGRESS</small><strong>{loaded?pct+'%':'—'}</strong><div className="meter"><div style={{width:pct+'%'}}/></div><p>Checklist items marked complete</p></div><div className="stat"><small>COMPLETED</small><strong>{loaded?count:'—'}<i> / {resources.length}</i></strong><p>Labs, reading, videos and practice</p></div><div className="stat"><small>EXAM DOMAINS</small><strong>4<i> domains</i></strong><p>Aligned to the current exam guide</p></div></section>
 {next&&loaded&&<section className="focus"><div><p className="eyebrow">● &nbsp; UP NEXT · HANDS-ON</p><h2>{next.title}</h2><p>{next.detail}</p><small>{next.mins} min suggested · {next.source}</small></div><a className="primary" href={next.url} target="_blank" rel="noopener noreferrer">Start this lab ↗</a></section>}
 <section className="section"><div className="section-title"><div><p className="eyebrow">EXAM BLUEPRINT</p><h2>Explore your domains</h2></div><a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300" target="_blank" rel="noopener noreferrer">Official exam guide ↗</a></div><div className="domains">{domains.map((d,i)=>{const items=resources.filter(r=>r.domain===d.id),n=items.filter(r=>done[r.id]).length;return <button key={d.id} className={'domain '+(domain===d.id?'selected':'')} onClick={()=>setDomain(d.id)}><small>0{i+1} <span>{d.weight}</span></small><strong>{d.name}</strong><p>{d.summary}</p><div className="meter"><div style={{width:Math.round(n/items.length*100)+'%'}}/></div><small>{n}/{items.length} complete</small></button>})}</div></section>
 <section className="section"><div className="section-title"><div><p className="eyebrow">YOUR RESOURCE LIBRARY</p><h2>{domain==='all'?'Start learning':domains.find(d=>d.id===domain)?.name}</h2></div><span className="muted">{filtered.length} resources</span></div><div className="toolbar"><div className="filters">{types.map(t=><button key={t} className={kind===t?'active':''} onClick={()=>setKind(t)}>{t==='Read'?'Reading':t==='Video'?'Videos':t==='Lab'?'Labs':t}</button>)}</div><input aria-label="Search study resources" placeholder="Search resources…" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="items">{filtered.map(item=><article className={'item '+(done[item.id]?'done':'')} key={item.id}><div className={'type '+item.kind.toLowerCase()}>{item.kind==='Lab'?'⚗':item.kind==='Video'?'▶':item.kind==='Read'?'▤':'◎'}</div><div className="details"><small>{item.kind} · {item.mins} min · {item.source}</small><h3>{item.title}</h3><p>{item.detail}</p><a target="_blank" rel="noopener noreferrer" href={item.url}>Open resource ↗</a></div><button className={'complete '+(done[item.id]?'checked':'')} disabled={!loaded||Boolean(saving)} onClick={()=>toggle(item)}>{saving===item.id?'Saving…':done[item.id]?'✓ Done':'Mark done'}</button></article>)}{filtered.length===0&&<p className="empty">No resources match your filters.</p>}</div></section>
 <footer>SC-300 Study Command Center · Private progress via Supabase <span>Completed checkboxes don't guarantee exam readiness.</span></footer></main></div>
}
function App(){
 const [session,setSession]=useState(null),[booting,setBooting]=useState(configured),[error,setError]=useState('')
 useEffect(()=>{if(!supabase)return;let active=true
  supabase.auth.getSession().then(({data,error:e})=>{if(active){if(e)setError(e.message);setSession(data.session);setBooting(false)}}).catch(e=>{if(active){setError(e.message);setBooting(false)}})
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>{if(active){setSession(s);setBooting(false)}})
  return()=>{active=false;subscription.unsubscribe()}
 },[])
 if(!configured)return <div className="login"><div className="login-card"><h1>Supabase configuration missing</h1><p>Check Vite environment variables.</p></div></div>
 if(booting)return <div className="login"><p>Signing you in…</p></div>
 if(error)return <div className="login"><p className="error">{error}</p></div>
 return session?<Dashboard session={session}/>:<Login/>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)