# Appwrite Database Setup Guide for AIML Club V6

## Project Details

- **Project ID**: `696f6e31002241c92438`
- **Project Name**: AIML Club V6
- **Endpoint**: `https://fra.cloud.appwrite.io/v1`

---

## Step 1: Create Database

1. Go to your [Appwrite Console](https://fra.cloud.appwrite.io)
2. Navigate to **Databases** in the sidebar
3. Click **Create database**
4. Enter the following:
   - **Database ID**: `aiml-club-db`
   - **Name**: `AIML Club Database`
5. Click **Create**

---

## Step 2: Create Collections

### Collection 1: Members

1. Inside the database, click **Create collection**
2. Enter:
   - **Collection ID**: `members`
   - **Name**: `Members`
3. Click **Create**
4. Go to **Settings** tab and under **Permissions**, add:
   - Role: `Any` → Read: ✅
5. Go to **Attributes** tab and create these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| `name` | String | 100 | ✅ | - |
| `role` | String | 100 | ✅ | - |
| `image` | String | 500 | ✅ | - |
| `bio` | String | 1000 | ❌ | - |
| `techStack` | String[] | - | ❌ | - |
| `linkedin` | URL | - | ❌ | - |
| `github` | URL | - | ❌ | - |
| `twitter` | URL | - | ❌ | - |

---

### Collection 2: Projects

1. Click **Create collection**
2. Enter:
   - **Collection ID**: `projects`
   - **Name**: `Projects`
3. Click **Create**
4. Go to **Settings** → **Permissions**, add:
   - Role: `Any` → Read: ✅
5. Create these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| `title` | String | 200 | ✅ | - |
| `description` | String | 2000 | ✅ | - |
| `technologies` | String[] | - | ❌ | - |
| `tags` | String[] | - | ❌ | - |
| `image` | String | 500 | ❌ | - |
| `link` | URL | - | ❌ | - |
| `demoUrl` | URL | - | ❌ | - |
| `repoUrl` | URL | - | ❌ | - |
| `authorIds` | String[] | - | ❌ | - |

---

### Collection 3: Events

1. Click **Create collection**
2. Enter:
   - **Collection ID**: `events`
   - **Name**: `Events`
3. Click **Create**
4. Go to **Settings** → **Permissions**, add:
   - Role: `Any` → Read: ✅
5. Create these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| `title` | String | 200 | ✅ | - |
| `description` | String | 2000 | ✅ | - |
| `date` | DateTime | - | ✅ | - |
| `location` | String | 200 | ✅ | - |
| `image` | String | 500 | ❌ | - |
| `status` | Enum | - | ❌ | `upcoming` |
| `registrationUrl` | URL | - | ❌ | - |

**For the `status` enum**, set these values:

- `upcoming`
- `past`

---

### Collection 4: Suggestions

1. Click **Create collection**
2. Enter:
   - **Collection ID**: `suggestions`
   - **Name**: `Suggestions`
3. Click **Create**
4. Go to **Settings** → **Permissions**, add:
   - Role: `Any` → Create: ✅ (so anyone can submit)
   - Role: `Users` → Read: ✅ (only logged-in users/admins can view)
5. Create these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| `name` | String | 100 | ❌ | - |
| `email` | Email | - | ❌ | - |
| `category` | String | 50 | ✅ | - |
| `text` | String | 5000 | ✅ | - |
| `isAnonymous` | Boolean | - | ✅ | `false` |

---

## Step 3: Create Storage Bucket (Optional - for images)

1. Navigate to **Storage** in the sidebar
2. Click **Create bucket**
3. Enter:
   - **Bucket ID**: `images`
   - **Name**: `Images`
4. Configure settings:
   - **Maximum file size**: 5MB
   - **Allowed file extensions**: `jpg, jpeg, png, webp, gif, svg`
5. Go to **Settings** → **Permissions**, add:
   - Role: `Any` → Read: ✅
   - Role: `Users` → Create, Update, Delete: ✅

---

## Step 4: Verify Setup

After creating everything, your database structure should look like:

```
📦 aiml-club-db
├── 📁 members
├── 📁 projects
├── 📁 events
└── 📁 suggestions

📦 images (Storage Bucket)
```

---

## Step 5: Test the Integration

1. Run your development server: `npm run dev`
2. Open `http://localhost:3000` in your browser
3. Check the browser console for the Appwrite ping message:

   ```
   ✅ Appwrite connection successful! {message: Pong!}
   ```

4. Try submitting a suggestion on the Suggestions page
5. Check the Appwrite Console → Databases → suggestions collection to see the data

---

## Files Created/Modified

| File | Description |
|------|-------------|
| `src/lib/appwrite.ts` | Appwrite client configuration |
| `src/lib/database.ts` | Database service with CRUD operations |
| `src/components/layout/appwrite-ping.tsx` | Auto-ping component for connection verification |
| `src/app/layout.tsx` | Added AppwritePing component |
| `src/app/suggestions/page.tsx` | Integrated with Appwrite to save suggestions |

---

## Next Steps

1. **Add sample data**: Go to each collection and add some sample documents
2. **Set up Auth**: Configure authentication methods in Appwrite Console → Auth → Settings
3. **Create admin panel**: Build an admin interface to manage content
4. **Enable email**: Set up SMTP in Appwrite for email notifications
