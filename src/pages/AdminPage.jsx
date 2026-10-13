import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/products.js';
import { cldUrl } from '../lib/cloudinary.js';
import { listListings, createListing, patchListing, signUpload, uploadToCloudinary } from '../lib/adminApi.js';

const GLYPHS = ['comic', 'figure', 'mask', 'shield', 'cape', 'web', 'raygun', 'badge', 'bust', 'frame'];

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c !== 'Todos');

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [republishing, setRepublishing] = useState(false);

  // Form state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0] || 'Quadrinhos');
  const [condition, setCondition] = useState('');
  const [maker, setMaker] = useState('');
  const [note, setNote] = useState('');
  const [art, setArt] = useState('comic');
  const [imageAlt, setImageAlt] = useState('');
  const [featured, setFeatured] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await listListings();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      let imageUrl = '';
      if (file) {
        const sig = await signUpload();
        imageUrl = await uploadToCloudinary(file, sig);
      }

      const payload = {
        title,
        price: parseFloat(price) || 0,
        category,
        condition,
        maker,
        note,
        art,
        image_url: imageUrl,
        image_alt: imageAlt,
        featured,
      };

      await createListing(payload);
      // Reset form
      setFile(null);
      setPreview(null);
      setTitle('');
      setPrice('');
      setCondition('');
      setMaker('');
      setNote('');
      setImageAlt('');
      setFeatured(false);

      await fetchItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handlePatch = async (recordId, patch) => {
    setBusy(true);
    setRepublishing(true);
    setError(null);
    try {
      const updated = await patchListing(recordId, patch);
      setItems((prev) => prev.map((item) => (item.id === updated.id || item.recordId === recordId ? updated : item)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      setTimeout(() => setRepublishing(false), 3000);
    }
  };

  const handlePinTop = (item) => {
    const finiteRanks = items.map((i) => (typeof i.rank === 'number' && !isNaN(i.rank) ? i.rank : null)).filter((r) => r !== null);
    const maxRank = finiteRanks.length > 0 ? Math.max(...finiteRanks) : 0;
    const newRank = maxRank + 1;
    const recordId = item.recordId || item.id;
    handlePatch(recordId, { rank: newRank });
  };

  const handleSendBottom = (item) => {
    const finiteRanks = items.map((i) => (typeof i.rank === 'number' && !isNaN(i.rank) ? i.rank : null)).filter((r) => r !== null);
    const minRank = finiteRanks.length > 0 ? Math.min(...finiteRanks) : 0;
    const newRank = minRank - 1;
    const recordId = item.recordId || item.id;
    handlePatch(recordId, { rank: newRank });
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px', fontFamily: 'sans-serif', background: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>Acervo do Marvete — Admin</h1>
        {republishing && <span style={{ background: '#ffeb3b', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>Republicando…</span>}
      </header>

      {error && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <section style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginTop: 0 }}>Adicionar Novo Item</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Foto do Item</label>
            <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} style={{ fontSize: '16px' }} />
            {preview && (
              <div style={{ marginTop: '8px' }}>
                <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Título *</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Preço (R$) *</label>
              <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Categoria *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }}>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Condição</label>
              <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Ex: Perfeito, Bom" style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Fabricante / Maker</label>
              <input type="text" value={maker} onChange={(e) => setMaker(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Descrição (note)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Glifo (art)</label>
              <select value={art} onChange={(e) => setArt(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }}>
                {GLYPHS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Alt da Imagem</label>
              <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} style={{ width: '20px', height: '20px' }} />
              Destaque na Vitrine (featured)
            </label>
          </div>

          <button type="submit" disabled={busy} style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '14px', fontSize: '18px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
            {busy ? 'Salvando...' : 'Adicionar Item'}
          </button>
        </form>
      </section>

      <section style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '20px', marginTop: 0 }}>Inventário ({items.length})</h2>
        {loading ? (
          <p>Carregando itens...</p>
        ) : items.length === 0 ? (
          <p>Nenhum item cadastrado.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => {
              const recordId = item.recordId || item.id;
              const thumbUrl = cldUrl(item.image_url, { w: 160 });
              return (
                <div key={recordId} style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
                  <div style={{ width: '80px', height: '80px', background: '#ddd', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {thumbUrl ? (
                      <img src={thumbUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '12px', color: '#666' }}>{item.art || 'glifo'}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '16px', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                    <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
                      R$ {Number(item.price).toFixed(2)} | {item.category} {item.rank !== undefined ? `| rank: ${item.rank}` : ''}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Status:</label>
                      <select
                        value={item.status || 'available'}
                        onChange={(e) => handlePatch(recordId, { status: e.target.value })}
                        disabled={busy}
                        style={{ padding: '4px', fontSize: '14px' }}
                      >
                        <option value="available">available</option>
                        <option value="reserved">reserved</option>
                        <option value="sold">sold</option>
                      </select>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={!!item.featured}
                          onChange={(e) => handlePatch(recordId, { featured: e.target.checked })}
                          disabled={busy}
                        />
                        Destaque
                      </label>

                      <button type="button" onClick={() => handlePinTop(item)} disabled={busy} style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>
                        Pinar no topo
                      </button>

                      <button type="button" onClick={() => handleSendBottom(item)} disabled={busy} style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>
                        Enviar para o fim
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
