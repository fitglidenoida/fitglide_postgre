# Friends Schema & Data Integrity Fix

## 🔍 Issues Identified

### 1. **inviteToken Schema Issue**
- **Current**: `"required": true` in schema
- **Problem**: API returns `null` for inviteToken in some records
- **Fix**: Make `inviteToken` optional in schema

### 2. **Sender/Receiver Relationships Not Populating**
- **Current**: Relations defined but returning `null`
- **Problem**: Friend records not properly linked to users
- **Root Cause**: Friend creation flow uses email-based approach instead of user-based

### 3. **Data Flow Problems**
- **Current Flow**: 
  1. Send friend request with `receiver: nil` (email-based)
  2. Accept request but relationships remain `null`
- **Expected Flow**:
  1. Send friend request with proper `sender` and `receiver` user IDs
  2. Accept request maintains proper relationships

## 🔧 Required Updates

### 1. **Update Friend Schema**
```json
{
  "inviteToken": {
    "type": "string",
    "unique": true,
    "required": false  // ← Change from true to false
  },
  "sender": {
    "type": "relation",
    "relation": "manyToOne",
    "target": "plugin::users-permissions.user",
    "inversedBy": "sent_friend_requests",
    "required": false  // ← Add this
  },
  "receiver": {
    "type": "relation", 
    "relation": "manyToOne",
    "target": "plugin::users-permissions.user",
    "inversedBy": "received_friend_requests",
    "required": false  // ← Add this
  }
}
```

### 2. **Fix Friend Creation Flow**

#### **Current iOS Code Issues:**
```swift
// ❌ Problem: receiver is nil
let request = FriendRequest(
    sender: UserId(id: userId),
    receiver: nil,  // ← This should be populated
    friendEmail: emailToInvite,
    friendsStatus: "Pending",
    inviteToken: UUID().uuidString,
    senderName: senderName,
    receiverName: nil
)
```

#### **Required Fix:**
1. **Look up user by email** before creating friend request
2. **Populate receiver field** with actual user ID
3. **Ensure both sender and receiver** are properly linked

### 3. **Data Integrity Audit**

#### **Check Existing Records:**
```sql
-- Find friend records with null sender/receiver
SELECT * FROM friends WHERE sender IS NULL OR receiver IS NULL;

-- Find friend records with proper relationships
SELECT * FROM friends WHERE sender IS NOT NULL AND receiver IS NOT NULL;
```

#### **Fix Existing Data:**
1. **Identify orphaned friend records**
2. **Link them to proper user accounts**
3. **Update senderName/receiverName** from user data

## 🚀 Implementation Steps

### **Phase 1: Schema Updates**
1. ✅ Update friend schema to make `inviteToken` optional
2. ✅ Add `required: false` to sender/receiver relations
3. ✅ Deploy schema changes

### **Phase 2: Data Integrity**
1. 🔄 Audit existing friend records
2. 🔄 Fix orphaned records
3. 🔄 Verify relationship integrity

### **Phase 3: Code Updates**
1. ✅ Fix iOS friend creation flow
2. ✅ Add user lookup by email
3. ✅ Ensure proper relationship population

### **Phase 4: Testing**
1. 🔄 Test friend request creation
2. 🔄 Test friend request acceptance
3. 🔄 Verify friends display correctly

## 🎯 Expected Results

After fixes:
- ✅ **inviteToken** can be null without breaking API
- ✅ **sender/receiver** relationships properly populated
- ✅ **Friends display** correctly in iOS app
- ✅ **Friend indicators** show up in packs/challenges
- ✅ **Cross-platform sync** works properly

## 📋 Action Items

1. **Update friend schema** (schema-updated.json provided)
2. **Deploy schema changes** to Strapi
3. **Audit existing data** for integrity issues
4. **Fix friend creation flow** in iOS code
5. **Test complete friend flow** end-to-end
