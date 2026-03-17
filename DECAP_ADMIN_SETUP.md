# Decap Admin Setup (Campos Misiones)

Este repo ya incluye integración base para editar contenido desde `/admin`.

## Archivos agregados
- `admin/index.html`
- `admin/config.yml`
- `content/site.json`

## Archivos actualizados
- `index.html` (IDs para contenido editable)
- `script.js` (carga configuración desde `content/site.json`)

## Qué se puede editar en `/admin`
- Marca
- Hero (título y texto)
- Email
- WhatsApp (número y mensaje inicial)
- Facebook e Instagram
- Mapa propiedad 1 (link + embed)
- Mapa propiedad 2 (link + embed)

## Activación en Netlify
1. Ir a **Site configuration > Identity** y activar Identity.
2. En Identity, activar **Git Gateway**.
3. Invitar usuario administrador (correo del cliente).
4. Confirmar que el branch principal es `main`.
5. Deploy del sitio.

## Probar
1. Abrir `https://tu-sitio.netlify.app/admin/`
2. Iniciar sesión.
3. Editar campos en "Configuración del Sitio".
4. Guardar.
5. Verificar commit automático + redeploy.

## Nota
Si no ves cambios, revisa:
- que `content/site.json` exista en `main`
- que Git Gateway esté activo
- que el deploy se haya completado
