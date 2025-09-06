import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiBadgeBadge extends Struct.CollectionTypeSchema {
  collectionName: 'badges';
  info: {
    displayName: 'badge';
    pluralName: 'badges';
    singularName: 'badge';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::badge.badge'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogBlog extends Struct.CollectionTypeSchema {
  collectionName: 'blogs';
  info: {
    displayName: 'blog';
    pluralName: 'blogs';
    singularName: 'blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::blog.blog'> &
      Schema.Attribute.Private;
    meta_description: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'>;
    thumbnail: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiChallengeChallenge extends Struct.CollectionTypeSchema {
  collectionName: 'challenges';
  info: {
    description: '';
    displayName: 'challenge';
    pluralName: 'challenges';
    singularName: 'challenge';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activities: Schema.Attribute.JSON;
    challenge_status: Schema.Attribute.Enumeration<
      ['pending', 'accepted', 'completed']
    >;
    challengee_pack: Schema.Attribute.Relation<'manyToOne', 'api::pack.pack'>;
    challengee_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    challengeeId: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    challenger_pack: Schema.Attribute.Relation<'manyToOne', 'api::pack.pack'>;
    challenger_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    challengerId: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.Date;
    goal: Schema.Attribute.Integer;
    goalType: Schema.Attribute.Enumeration<['single', 'combined', 'any']>;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    individualGoals: Schema.Attribute.JSON;
    invitations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invitation.invitation'
    >;
    isPublic: Schema.Attribute.Boolean;
    isRecommended: Schema.Attribute.Boolean;
    level: Schema.Attribute.Enumeration<['Beginner', 'Intermediate', 'Pro']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::challenge.challenge'
    > &
      Schema.Attribute.Private;
    maxParticipants: Schema.Attribute.Integer;
    metrics: Schema.Attribute.JSON;
    participants: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    posts: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
    publishedAt: Schema.Attribute.DateTime;
    startDate: Schema.Attribute.Date;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['Solo', 'Pack', 'PackVsPack']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    winner: Schema.Attribute.String;
  };
}

export interface ApiCheerCheer extends Struct.CollectionTypeSchema {
  collectionName: 'cheers';
  info: {
    description: '';
    displayName: 'cheer';
    pluralName: 'cheers';
    singularName: 'cheer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isLive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::cheer.cheer'> &
      Schema.Attribute.Private;
    message: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Way to go!'>;
    publishedAt: Schema.Attribute.DateTime;
    receiver: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    sender: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    type: Schema.Attribute.Enumeration<['text', 'emoji', 'sound']> &
      Schema.Attribute.DefaultTo<'text'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workoutId: Schema.Attribute.String;
  };
}

export interface ApiCoachCoach extends Struct.CollectionTypeSchema {
  collectionName: 'coaches';
  info: {
    description: '';
    displayName: 'Coach';
    pluralName: 'coaches';
    singularName: 'coach';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bio: Schema.Attribute.Text;
    certifications: Schema.Attribute.Text;
    clients: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    coachId: Schema.Attribute.UID;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::coach.coach'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    specialty: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiCommentComment extends Struct.CollectionTypeSchema {
  collectionName: 'comments';
  info: {
    description: '';
    displayName: 'Comment';
    pluralName: 'comments';
    singularName: 'comment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::comment.comment'
    > &
      Schema.Attribute.Private;
    post: Schema.Attribute.Relation<'manyToOne', 'api::post.post'>;
    publishedAt: Schema.Attribute.DateTime;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    thread: Schema.Attribute.Relation<'manyToOne', 'api::thread.thread'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiDailyQuestDailyQuest extends Struct.CollectionTypeSchema {
  collectionName: 'daily_quests';
  info: {
    displayName: 'daily-quest';
    pluralName: 'daily-quests';
    singularName: 'daily-quest';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    goal: Schema.Attribute.JSON & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::daily-quest.daily-quest'
    > &
      Schema.Attribute.Private;
    progress: Schema.Attribute.Decimal & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiDesiMessageDesiMessage extends Struct.CollectionTypeSchema {
  collectionName: 'desi_messages';
  info: {
    displayName: 'desi-message';
    pluralName: 'desi-messages';
    singularName: 'desi-message';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    achievement_category: Schema.Attribute.Enumeration<
      [
        'fitness',
        'nutrition',
        'social',
        'streak',
        'milestone',
        'wellness',
        'challenge',
      ]
    >;
    badge: Schema.Attribute.Enumeration<['fitness', 'motivation', 'hydration']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    festival_context: Schema.Attribute.Enumeration<
      ['diwali', 'holi', 'rakhi', 'independence_day', 'republic_day', 'any']
    > &
      Schema.Attribute.DefaultTo<'any'>;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    is_premium: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    language_style: Schema.Attribute.Enumeration<
      ['hinglish', 'desi', 'funny', 'pure_english']
    >;
    last_used: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::desi-message.desi-message'
    > &
      Schema.Attribute.Private;
    max_level: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<5>;
    message_text: Schema.Attribute.Text & Schema.Attribute.Required;
    message_type: Schema.Attribute.Enumeration<
      [
        'achievement_celebration',
        'level_up',
        'streak_milestone',
        'daily_motivation',
        'progress_motivation',
        'festival_context',
        'workout_completion',
        'wellness_reminder',
      ]
    > &
      Schema.Attribute.DefaultTo<'daily_motivation'>;
    min_level: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    priority: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    publishedAt: Schema.Attribute.DateTime;
    streak_days: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
    today_line: Schema.Attribute.Text;
    trigger_condition: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usage_count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    yesterday_line: Schema.Attribute.Text;
  };
}

export interface ApiDietComponentDietComponent
  extends Struct.CollectionTypeSchema {
  collectionName: 'diet_components';
  info: {
    description: '';
    displayName: 'DietComponent';
    pluralName: 'diet-components';
    singularName: 'diet-component';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    brand: Schema.Attribute.String;
    calcium: Schema.Attribute.String;
    calories: Schema.Attribute.Integer;
    carbohydrate: Schema.Attribute.String;
    category: Schema.Attribute.String;
    cholestrol: Schema.Attribute.String;
    component_id: Schema.Attribute.UID;
    consumed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cuisine: Schema.Attribute.Enumeration<
      [
        'North Indian',
        'South Indian',
        'Gujarati',
        'Bengali',
        'Marathi',
        'Rajasthani',
        'Punjabi',
        'Kashmiri',
        'Konkani',
        'North Eastern',
      ]
    >;
    fiber: Schema.Attribute.String;
    food_type: Schema.Attribute.Enumeration<['Veg', 'Non-Veg']>;
    iron: Schema.Attribute.String;
    is_common: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::diet-component.diet-component'
    > &
      Schema.Attribute.Private;
    meal_suitability: Schema.Attribute.JSON;
    meals: Schema.Attribute.Relation<'manyToMany', 'api::meal.meal'>;
    name: Schema.Attribute.String;
    portion_size: Schema.Attribute.Integer;
    potassium: Schema.Attribute.String;
    protein: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    recipe_url: Schema.Attribute.String;
    saturated_fat: Schema.Attribute.String;
    sodium: Schema.Attribute.String;
    sugar: Schema.Attribute.String;
    timestamp: Schema.Attribute.DateTime;
    total_fat: Schema.Attribute.String;
    unit: Schema.Attribute.Enumeration<
      [
        'Nos',
        'Piece',
        'Slice',
        'Handful',
        'gm',
        'kg',
        'mg',
        'ml',
        'l',
        'Cup',
        'Glass',
        'Tea Cup',
        'Bowl',
        'Tablespoon',
        'Teaspoon',
        'Katori',
        'Vati',
        'Thali',
        'Small',
        'Medium',
        'Large',
        'Serving',
        'Pinch',
        'Drop',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vitamin_c: Schema.Attribute.String;
  };
}

export interface ApiDietLogDietLog extends Struct.CollectionTypeSchema {
  collectionName: 'diet_logs';
  info: {
    description: '';
    displayName: 'diet-log';
    pluralName: 'diet-logs';
    singularName: 'diet-log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::diet-log.diet-log'
    > &
      Schema.Attribute.Private;
    meals: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    totalCalories: Schema.Attribute.Decimal;
    totalCarbs: Schema.Attribute.Decimal;
    totalFat: Schema.Attribute.Decimal;
    totalFiber: Schema.Attribute.Decimal;
    totalProtein: Schema.Attribute.Decimal;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiDietPlanDietPlan extends Struct.CollectionTypeSchema {
  collectionName: 'diet_plans';
  info: {
    description: '';
    displayName: 'DietPlan';
    pluralName: 'diet-plans';
    singularName: 'diet-plan';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diet_goal: Schema.Attribute.String;
    diet_preference: Schema.Attribute.Enumeration<['Veg', 'Non-Veg']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::diet-plan.diet-plan'
    > &
      Schema.Attribute.Private;
    meals: Schema.Attribute.Relation<'oneToMany', 'api::meal.meal'>;
    plan_id: Schema.Attribute.UID;
    points_earned: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    total_calories: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiDietTemplateDietTemplate
  extends Struct.CollectionTypeSchema {
  collectionName: 'diet_templates';
  info: {
    description: '';
    displayName: 'DietTemplate';
    pluralName: 'diet-templates';
    singularName: 'diet-template';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    diet_preference: Schema.Attribute.Enumeration<['Veg', 'Non-Veg']>;
    diet_template_id: Schema.Attribute.UID;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::diet-template.diet-template'
    > &
      Schema.Attribute.Private;
    meals: Schema.Attribute.Relation<'oneToMany', 'api::meal.meal'>;
    notes: Schema.Attribute.Text;
    plan_name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    total_calories: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDieticianDietician extends Struct.CollectionTypeSchema {
  collectionName: 'dieticians';
  info: {
    description: '';
    displayName: 'Dietician';
    pluralName: 'dieticians';
    singularName: 'dietician';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    availability: Schema.Attribute.JSON;
    bio: Schema.Attribute.Text;
    certifications: Schema.Attribute.Text;
    clients: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dieticianId: Schema.Attribute.UID;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::dietician.dietician'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiEquipmentEquipment extends Struct.CollectionTypeSchema {
  collectionName: 'equipments';
  info: {
    description: '';
    displayName: 'equipment';
    pluralName: 'equipments';
    singularName: 'equipment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    equipment_id: Schema.Attribute.UID;
    exercises: Schema.Attribute.Relation<
      'manyToMany',
      'api::exercise.exercise'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipment.equipment'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiExerciseExercise extends Struct.CollectionTypeSchema {
  collectionName: 'exercises';
  info: {
    description: '';
    displayName: 'Exercise';
    pluralName: 'exercises';
    singularName: 'exercise';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    calories_per_minute: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    duration: Schema.Attribute.Decimal;
    equipment: Schema.Attribute.Relation<
      'manyToMany',
      'api::equipment.equipment'
    >;
    exercise_id: Schema.Attribute.UID;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::exercise.exercise'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    reps: Schema.Attribute.Integer;
    rest_between_sets: Schema.Attribute.Integer;
    sets: Schema.Attribute.Integer;
    sport_type: Schema.Attribute.Enumeration<
      [
        'Running',
        'Cycling',
        'Swimming',
        'Hiking',
        'Strength',
        'Cardio',
        'Full-Body',
        'Lower Body',
        'Upper Body',
        'Core',
        'Hybrid (Strength + Cardio)',
        'Plyometric (Explosive)',
        'Functional Training',
        'Flexibility and Mobility',
        'Powerlifting',
        'Bodyweight Training',
        'High-Intensity Interval Training (HIIT)',
        'Pilates',
        'Yoga',
        'Circuit Training',
        'Isometric Training',
        'Endurance Training',
        'Agility and Speed Training',
        'Rehabilitation and Low-Impact',
        'Dance Fitness',
        'Rowing',
        'Badminton',
        'Tennis',
        'Jogging',
      ]
    >;
    steps: Schema.Attribute.Text;
    type: Schema.Attribute.Enumeration<
      ['Warm-up', 'Cardio', 'Strength', 'Flexibility', 'Cool-down']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weight: Schema.Attribute.Integer;
    workout: Schema.Attribute.Relation<'manyToOne', 'api::workout.workout'>;
  };
}

export interface ApiFitcoinLogFitcoinLog extends Struct.CollectionTypeSchema {
  collectionName: 'fitcoin_logs';
  info: {
    description: '';
    displayName: 'fitcoin-log';
    pluralName: 'fitcoin-logs';
    singularName: 'fitcoin-log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    fitcoin_balance: Schema.Attribute.Integer;
    fitcoins: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::fitcoin-log.fitcoin-log'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    reason: Schema.Attribute.Enumeration<['badge', 'streak', 'achievement']>;
    referenceId: Schema.Attribute.UID;
    sourceText: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiForumForum extends Struct.CollectionTypeSchema {
  collectionName: 'forums';
  info: {
    displayName: 'forum';
    pluralName: 'forums';
    singularName: 'forum';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::forum.forum'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    threads: Schema.Attribute.Relation<'oneToMany', 'api::thread.thread'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiFriendFriend extends Struct.CollectionTypeSchema {
  collectionName: 'friends';
  info: {
    description: '';
    displayName: 'friend';
    pluralName: 'friends';
    singularName: 'friend';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    friendEmail: Schema.Attribute.String;
    friends_status: Schema.Attribute.Enumeration<
      ['Pending', 'Accepted', 'Rejected']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Pending'>;
    invitations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invitation.invitation'
    >;
    inviteToken: Schema.Attribute.String & Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::friend.friend'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    receiver: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    receiverName: Schema.Attribute.String;
    sender: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    senderName: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHealthLogHealthLog extends Struct.CollectionTypeSchema {
  collectionName: 'health_logs';
  info: {
    description: '';
    displayName: 'HealthLog';
    pluralName: 'health-logs';
    singularName: 'health-log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    badges_earned: Schema.Attribute.JSON;
    caloriesBurned: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dateTime: Schema.Attribute.DateTime;
    distance: Schema.Attribute.Decimal;
    heartRate: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::health-log.health-log'
    > &
      Schema.Attribute.Private;
    logId: Schema.Attribute.UID;
    publishedAt: Schema.Attribute.DateTime;
    source: Schema.Attribute.String;
    steps: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    waterIntake: Schema.Attribute.Decimal;
    weight: Schema.Attribute.Decimal;
    wellnessFactors: Schema.Attribute.JSON;
    wellnessRecommendations: Schema.Attribute.JSON;
    wellnessScore: Schema.Attribute.Decimal;
  };
}

export interface ApiHealthVitalHealthVital extends Struct.CollectionTypeSchema {
  collectionName: 'health_vitals';
  info: {
    description: '';
    displayName: 'HealthVital';
    pluralName: 'health-vitals';
    singularName: 'health-vital';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activity_level: Schema.Attribute.Enumeration<
      [
        'Sedentary (little/no exercise)',
        'Light exercise (1-3 days/week)',
        'Moderate exercise (3-5 days/week)',
        'Heavy exercise (6-7 days/week)',
        'Very heavy exercise (Twice/day)',
      ]
    >;
    BMI: Schema.Attribute.Decimal;
    BMR: Schema.Attribute.Decimal;
    calorieGoal: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date_of_birth: Schema.Attribute.Date;
    gender: Schema.Attribute.Enumeration<['Male', 'Female']>;
    goal_achievements: Schema.Attribute.JSON;
    goal_commitment_level: Schema.Attribute.String;
    goal_confidence_score: Schema.Attribute.Decimal;
    goal_current_milestone: Schema.Attribute.String;
    goal_energy_score: Schema.Attribute.Decimal;
    goal_health_score: Schema.Attribute.Decimal;
    goal_insights: Schema.Attribute.JSON;
    goal_milestones: Schema.Attribute.JSON;
    goal_predicted_timeline: Schema.Attribute.Integer;
    goal_progress_percentage: Schema.Attribute.Decimal;
    goal_recommendations: Schema.Attribute.JSON;
    goal_recommended_activities: Schema.Attribute.JSON;
    goal_recommended_nutrition: Schema.Attribute.JSON;
    goal_social_score: Schema.Attribute.Decimal;
    goal_start_date: Schema.Attribute.Date;
    goal_stress_score: Schema.Attribute.Decimal;
    goal_success_probability: Schema.Attribute.Decimal;
    goal_target_date: Schema.Attribute.Date;
    goal_timeline: Schema.Attribute.Integer;
    height: Schema.Attribute.Integer;
    life_goal_category: Schema.Attribute.String;
    life_goal_type: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::health-vital.health-vital'
    > &
      Schema.Attribute.Private;
    PercentFat: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    secondary_goals: Schema.Attribute.JSON;
    stepGoal: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    vitalid: Schema.Attribute.UID;
    waterGoal: Schema.Attribute.Decimal;
    weekly_target_calculated: Schema.Attribute.Decimal;
    weight_loss_goal: Schema.Attribute.Integer;
    weight_loss_strategy: Schema.Attribute.Enumeration<
      ['Lean-(0.25 kg/week)', 'Aggressive-(0.5 kg/week)', 'Custom']
    >;
    WeightInKilograms: Schema.Attribute.Integer;
    wellnessFactors: Schema.Attribute.JSON;
    wellnessRecommendations: Schema.Attribute.JSON;
    wellnessScore: Schema.Attribute.Decimal;
  };
}

export interface ApiInvitationInvitation extends Struct.CollectionTypeSchema {
  collectionName: 'invitations';
  info: {
    description: '';
    displayName: 'invitation';
    pluralName: 'invitations';
    singularName: 'invitation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    challenge: Schema.Attribute.Relation<
      'manyToOne',
      'api::challenge.challenge'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime;
    friend: Schema.Attribute.Relation<'manyToOne', 'api::friend.friend'>;
    invitation_status: Schema.Attribute.Enumeration<
      ['pending', 'accepted', 'declined', 'expired']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    invitee: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    inviter: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invitation.invitation'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.String;
    pack: Schema.Attribute.Relation<'manyToOne', 'api::pack.pack'>;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<
      ['pack_invite', 'friend_request', 'challenge_invite']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMealFeedbackMealFeedback
  extends Struct.CollectionTypeSchema {
  collectionName: 'meal_feedbacks';
  info: {
    displayName: 'meal-feedback';
    pluralName: 'meal-feedbacks';
    singularName: 'meal-feedback';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::meal-feedback.meal-feedback'
    > &
      Schema.Attribute.Private;
    mealId: Schema.Attribute.String;
    newComponentId: Schema.Attribute.String;
    oldComponentId: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    timestamp: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String;
  };
}

export interface ApiMealMeal extends Struct.CollectionTypeSchema {
  collectionName: 'meals';
  info: {
    description: '';
    displayName: 'Meal';
    pluralName: 'meals';
    singularName: 'meal';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    base_portion: Schema.Attribute.Integer;
    base_portion_unit: Schema.Attribute.Enumeration<
      [
        'Nos',
        'Piece',
        'Slice',
        'Handful',
        'gm',
        'kg',
        'mg',
        'ml',
        'l',
        'Cup',
        'Glass',
        'Tea Cup',
        'Bowl',
        'Tablespoon',
        'Teaspoon',
        'Katori',
        'Vati',
        'Thali',
        'Small',
        'Medium',
        'Large',
        'Serving',
        'Pinch',
        'Drop',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    diet_components: Schema.Attribute.Relation<
      'manyToMany',
      'api::diet-component.diet-component'
    >;
    diet_plan: Schema.Attribute.Relation<
      'manyToOne',
      'api::diet-plan.diet-plan'
    >;
    diet_template: Schema.Attribute.Relation<
      'manyToOne',
      'api::diet-template.diet-template'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::meal.meal'> &
      Schema.Attribute.Private;
    meal_date: Schema.Attribute.Date;
    meal_id: Schema.Attribute.UID;
    meal_time: Schema.Attribute.Time;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    totalCalories: Schema.Attribute.Integer;
    totalCarbs: Schema.Attribute.Decimal;
    totalFat: Schema.Attribute.Decimal;
    totalProtein: Schema.Attribute.Decimal;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiMiniForumMiniForum extends Struct.CollectionTypeSchema {
  collectionName: 'mini_forums';
  info: {
    description: '';
    displayName: 'Mini-forum';
    pluralName: 'mini-forums';
    singularName: 'mini-forum';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    creator: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::mini-forum.mini-forum'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPackPack extends Struct.CollectionTypeSchema {
  collectionName: 'packs';
  info: {
    description: '';
    displayName: 'pack';
    pluralName: 'packs';
    singularName: 'pack';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    captain: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    challenges: Schema.Attribute.Relation<
      'oneToMany',
      'api::challenge.challenge'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    gliders: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    goal: Schema.Attribute.Integer & Schema.Attribute.Required;
    invitations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invitation.invitation'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::pack.pack'> &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    posts: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
    progress: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    visibility: Schema.Attribute.Enumeration<['public', 'private']> &
      Schema.Attribute.DefaultTo<'public'>;
  };
}

export interface ApiPeriodSymptomPeriodSymptom
  extends Struct.CollectionTypeSchema {
  collectionName: 'period_symptoms';
  info: {
    description: '';
    displayName: 'period-symptom';
    pluralName: 'period-symptoms';
    singularName: 'period-symptom';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['physical', 'emotional', 'cognitive', 'digestive', 'other']
    > &
      Schema.Attribute.DefaultTo<'physical'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cycleDay: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 35;
          min: 1;
        },
        number
      >;
    date: Schema.Attribute.Date;
    healthKitSampleId: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::period-symptom.period-symptom'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    notes: Schema.Attribute.String;
    period: Schema.Attribute.Relation<'manyToOne', 'api::period.period'>;
    publishedAt: Schema.Attribute.DateTime;
    severity: Schema.Attribute.Enumeration<['mild', 'moderate', 'severe']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'mild'>;
    source: Schema.Attribute.Enumeration<
      ['manual', 'healthkit', 'prediction']
    > &
      Schema.Attribute.DefaultTo<'manual'>;
    time: Schema.Attribute.Time;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiPeriodPeriod extends Struct.CollectionTypeSchema {
  collectionName: 'periods';
  info: {
    description: '';
    displayName: 'period';
    pluralName: 'periods';
    singularName: 'period';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    confidence: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cycleDay: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 35;
          min: 1;
        },
        number
      >;
    cycleLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 45;
          min: 20;
        },
        number
      >;
    duration: Schema.Attribute.Integer;
    endDate: Schema.Attribute.Date;
    flowIntensity: Schema.Attribute.Enumeration<['light', 'medium', 'heavy']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'medium'>;
    healthKitSampleId: Schema.Attribute.String;
    isPrediction: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::period.period'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.String;
    period_symptoms: Schema.Attribute.Relation<
      'oneToMany',
      'api::period-symptom.period-symptom'
    >;
    periodId: Schema.Attribute.UID;
    predictionAccuracy: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    source: Schema.Attribute.Enumeration<
      ['manual', 'healthkit', 'prediction']
    > &
      Schema.Attribute.DefaultTo<'manual'>;
    startDate: Schema.Attribute.Date;
    symptoms: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiPostPost extends Struct.CollectionTypeSchema {
  collectionName: 'posts';
  info: {
    description: '';
    displayName: 'post';
    pluralName: 'posts';
    singularName: 'post';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    challenge: Schema.Attribute.Relation<
      'manyToOne',
      'api::challenge.challenge'
    >;
    comments: Schema.Attribute.Relation<'oneToMany', 'api::comment.comment'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    data: Schema.Attribute.JSON & Schema.Attribute.Required;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::post.post'> &
      Schema.Attribute.Private;
    pack: Schema.Attribute.Relation<'manyToOne', 'api::pack.pack'>;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['streak', 'manual', 'live']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiSleeplogSleeplog extends Struct.CollectionTypeSchema {
  collectionName: 'sleeplogs';
  info: {
    description: '';
    displayName: 'Sleeplog';
    pluralName: 'sleeplogs';
    singularName: 'sleeplog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    deep_sleep_duration: Schema.Attribute.Decimal;
    endTime: Schema.Attribute.DateTime;
    light_sleep_duration: Schema.Attribute.Decimal;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sleeplog.sleeplog'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    rem_sleep_duration: Schema.Attribute.Decimal;
    sleep_awake_duration: Schema.Attribute.Decimal;
    sleep_duration: Schema.Attribute.Decimal;
    sleep_log_id: Schema.Attribute.UID;
    startTime: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiSocialRelationshipSocialRelationship
  extends Struct.CollectionTypeSchema {
  collectionName: 'social_relationships';
  info: {
    displayName: 'social-relationship';
    pluralName: 'social-relationships';
    singularName: 'social-relationship';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    context: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-relationship.social-relationship'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    related_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    relationship_type: Schema.Attribute.Enumeration<
      [
        'friend',
        'pack_member',
        'challenge_participant',
        'pack_captain',
        'challenge_challenger',
        'challenge_challengee',
      ]
    > &
      Schema.Attribute.Required;
    social_relationship_status: Schema.Attribute.Enumeration<
      ['pending', 'accepted', 'rejected', 'active', 'inactive', 'blocked']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'pending'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiStepSessionStepSession extends Struct.CollectionTypeSchema {
  collectionName: 'step_sessions';
  info: {
    displayName: 'step-session';
    pluralName: 'step-sessions';
    singularName: 'step-session';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    caloriesBurned: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    distance: Schema.Attribute.Decimal;
    endTime: Schema.Attribute.DateTime;
    heartRateAvg: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::step-session.step-session'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    source: Schema.Attribute.Enumeration<
      ['HealthKit', 'Strava', 'HealthConnect']
    >;
    startTime: Schema.Attribute.DateTime;
    steps: Schema.Attribute.Integer;
    tag: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiThreadThread extends Struct.CollectionTypeSchema {
  collectionName: 'threads';
  info: {
    description: '';
    displayName: 'thread';
    pluralName: 'threads';
    singularName: 'thread';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comments: Schema.Attribute.Relation<'oneToMany', 'api::comment.comment'>;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    forum: Schema.Attribute.Relation<'manyToOne', 'api::forum.forum'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::thread.thread'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiWaitlistWaitlist extends Struct.CollectionTypeSchema {
  collectionName: 'waitlists';
  info: {
    description: '';
    displayName: 'waitlist';
    pluralName: 'waitlists';
    singularName: 'waitlist';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::waitlist.waitlist'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    quiz_response: Schema.Attribute.String;
    referral_code: Schema.Attribute.String;
    referrals: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiWeightLossStoryWeightLossStory
  extends Struct.CollectionTypeSchema {
  collectionName: 'weight_loss_stories';
  info: {
    description: '';
    displayName: 'Achievement';
    pluralName: 'weight-loss-stories';
    singularName: 'weight-loss-story';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    achievementTags: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    firstName: Schema.Attribute.String;
    goalAchievedText: Schema.Attribute.String;
    likes: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::weight-loss-story.weight-loss-story'
    > &
      Schema.Attribute.Private;
    metrics: Schema.Attribute.JSON;
    nowPhoto: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    nowWeight: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    sharedExternally: Schema.Attribute.Boolean;
    storyId: Schema.Attribute.String;
    storyText: Schema.Attribute.Text;
    storyType: Schema.Attribute.Enumeration<
      [
        'Weight Loss',
        'Workout',
        'Transformation',
        'Hydration',
        'Sleep',
        'Mindfulness',
        'Consistency',
        'Other',
      ]
    >;
    thenPhoto: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    thenWeight: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    visibility: Schema.Attribute.Enumeration<['Everyone', 'Friends', 'Pack']>;
    weightLost: Schema.Attribute.Integer;
  };
}

export interface ApiWorkoutLogWorkoutLog extends Struct.CollectionTypeSchema {
  collectionName: 'workout_logs';
  info: {
    description: '';
    displayName: 'workout_log';
    pluralName: 'workout-logs';
    singularName: 'workout-log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    athlete_id: Schema.Attribute.Integer;
    Calories: Schema.Attribute.Decimal;
    completed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Distance: Schema.Attribute.Decimal;
    endTime: Schema.Attribute.DateTime;
    HeartRateAverage: Schema.Attribute.Integer;
    HeartRateMaximum: Schema.Attribute.Integer;
    HeartRateMinimum: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::workout-log.workout-log'
    > &
      Schema.Attribute.Private;
    logId: Schema.Attribute.UID;
    moving_time: Schema.Attribute.Decimal;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    route: Schema.Attribute.JSON;
    source: Schema.Attribute.String;
    startTime: Schema.Attribute.DateTime;
    strava_activity_id: Schema.Attribute.Integer;
    TotalTime: Schema.Attribute.Decimal;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    workout: Schema.Attribute.Relation<'manyToOne', 'api::workout.workout'>;
  };
}

export interface ApiWorkoutWorkout extends Struct.CollectionTypeSchema {
  collectionName: 'workouts';
  info: {
    description: '';
    displayName: 'Workout';
    pluralName: 'workouts';
    singularName: 'workout';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Calories: Schema.Attribute.Decimal;
    CaloriesPlanned: Schema.Attribute.Decimal;
    completed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    current_day: Schema.Attribute.Integer;
    current_week: Schema.Attribute.Integer;
    day_number: Schema.Attribute.Integer;
    Description: Schema.Attribute.String;
    Distance: Schema.Attribute.Decimal;
    DistancePlanned: Schema.Attribute.Decimal;
    endTime: Schema.Attribute.DateTime;
    estimated_calories_per_week: Schema.Attribute.Integer;
    exercise_order: Schema.Attribute.JSON;
    exercises: Schema.Attribute.Relation<'oneToMany', 'api::exercise.exercise'>;
    HeartRateAverage: Schema.Attribute.BigInteger;
    HeartRateMaximum: Schema.Attribute.BigInteger;
    HeartRateMinimum: Schema.Attribute.BigInteger;
    is_premium: Schema.Attribute.Boolean;
    is_template: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::workout.workout'
    > &
      Schema.Attribute.Private;
    plan_category: Schema.Attribute.Enumeration<
      ['Running', 'Strength', 'Cardio', 'Mixed', 'Weight Loss']
    >;
    plan_completion_percentage: Schema.Attribute.Decimal;
    plan_description: Schema.Attribute.Text;
    plan_difficulty_rating: Schema.Attribute.Decimal;
    plan_duration_weeks: Schema.Attribute.Integer;
    plan_level: Schema.Attribute.Enumeration<
      ['Beginner', 'Intermediate', 'Advanced']
    >;
    plan_name: Schema.Attribute.String;
    plan_start_date: Schema.Attribute.Date;
    plan_thumbnail: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    premium_tier: Schema.Attribute.Enumeration<['Free', 'Basic', 'Pro']>;
    publishedAt: Schema.Attribute.DateTime;
    rest_day: Schema.Attribute.Boolean;
    sport_type: Schema.Attribute.Enumeration<
      [
        'Running',
        'Cycling',
        'Swimming',
        'Hiking',
        'Strength',
        'Cardio',
        'Full-Body',
        'Lower Body',
        'Upper Body',
        'Core',
        'Hybrid (Strength + Cardio)',
        'Plyometric (Explosive)',
        'Functional Training',
        'Flexibility and Mobility',
        'Powerlifting',
        'Bodyweight Training',
        'High-Intensity Interval Training (HIIT)',
        'Pilates',
        'Yoga',
        'Circuit Training',
        'Isometric Training',
        'Endurance Training',
        'Agility and Speed Training',
        'Rehabilitation and Low-Impact',
        'Dance Fitness',
        'Rowing',
        'Badminton',
        'Tennis',
        'Jogging',
      ]
    >;
    startTime: Schema.Attribute.DateTime;
    Title: Schema.Attribute.String;
    TotalTime: Schema.Attribute.Decimal;
    TotalTimePlanned: Schema.Attribute.Decimal;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    week_number: Schema.Attribute.Integer;
    workout_logs: Schema.Attribute.Relation<
      'oneToMany',
      'api::workout-log.workout-log'
    >;
    workoutId: Schema.Attribute.UID;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    athlete_id: Schema.Attribute.Integer;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    challenge_participants: Schema.Attribute.Relation<
      'manyToMany',
      'api::challenge.challenge'
    >;
    challenges: Schema.Attribute.Relation<
      'oneToMany',
      'api::challenge.challenge'
    >;
    challenges_challengee: Schema.Attribute.Relation<
      'oneToMany',
      'api::challenge.challenge'
    >;
    challenges_challenger: Schema.Attribute.Relation<
      'oneToMany',
      'api::challenge.challenge'
    >;
    cheers: Schema.Attribute.Relation<'oneToMany', 'api::cheer.cheer'>;
    coach_clients: Schema.Attribute.Relation<'manyToMany', 'api::coach.coach'>;
    coach_profile: Schema.Attribute.Relation<'oneToOne', 'api::coach.coach'>;
    comments: Schema.Attribute.Relation<'oneToMany', 'api::comment.comment'>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    daily_quests: Schema.Attribute.Relation<
      'oneToMany',
      'api::daily-quest.daily-quest'
    >;
    diet_logs: Schema.Attribute.Relation<'oneToMany', 'api::diet-log.diet-log'>;
    diet_plans: Schema.Attribute.Relation<
      'oneToMany',
      'api::diet-plan.diet-plan'
    >;
    dietician_clients: Schema.Attribute.Relation<
      'manyToMany',
      'api::dietician.dietician'
    >;
    dietician_profile: Schema.Attribute.Relation<
      'oneToOne',
      'api::dietician.dietician'
    >;
    dieticians: Schema.Attribute.Relation<
      'oneToMany',
      'api::dietician.dietician'
    >;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstName: Schema.Attribute.String;
    fitcoin_logs: Schema.Attribute.Relation<
      'oneToMany',
      'api::fitcoin-log.fitcoin-log'
    >;
    forums: Schema.Attribute.Relation<'oneToMany', 'api::forum.forum'>;
    googleId: Schema.Attribute.String;
    health_logs: Schema.Attribute.Relation<
      'oneToMany',
      'api::health-log.health-log'
    >;
    health_vitals: Schema.Attribute.Relation<
      'oneToMany',
      'api::health-vital.health-vital'
    >;
    lastName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    maxGreetingsEnabled: Schema.Attribute.Boolean;
    meals: Schema.Attribute.Relation<'oneToMany', 'api::meal.meal'>;
    mini_forums: Schema.Attribute.Relation<
      'oneToMany',
      'api::mini-forum.mini-forum'
    >;
    mobile: Schema.Attribute.Integer &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMax<
        {
          min: 10;
        },
        number
      >;
    myPic: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    notificationsEnabled: Schema.Attribute.Boolean;
    pack: Schema.Attribute.Relation<'oneToOne', 'api::pack.pack'>;
    packs: Schema.Attribute.Relation<'manyToMany', 'api::pack.pack'>;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    period_symptoms: Schema.Attribute.Relation<
      'oneToMany',
      'api::period-symptom.period-symptom'
    >;
    periods: Schema.Attribute.Relation<'oneToMany', 'api::period.period'>;
    picture: Schema.Attribute.String;
    posts: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
    privacySettings: Schema.Attribute.JSON;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    received_cheers: Schema.Attribute.Relation<'oneToMany', 'api::cheer.cheer'>;
    received_friend_requests: Schema.Attribute.Relation<
      'oneToMany',
      'api::friend.friend'
    >;
    receivedInvitations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invitation.invitation'
    >;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    sent_friend_requests: Schema.Attribute.Relation<
      'oneToMany',
      'api::friend.friend'
    >;
    sentInvitations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invitation.invitation'
    >;
    sleeplogs: Schema.Attribute.Relation<'oneToMany', 'api::sleeplog.sleeplog'>;
    social_relationships: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-relationship.social-relationship'
    >;
    step_sessions: Schema.Attribute.Relation<
      'oneToMany',
      'api::step-session.step-session'
    >;
    strava_connected: Schema.Attribute.Boolean;
    themePreference: Schema.Attribute.Enumeration<['light', 'dark', 'system']>;
    threads: Schema.Attribute.Relation<'oneToMany', 'api::thread.thread'>;
    type: Schema.Attribute.Enumeration<['regular', 'coach', 'dietician']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    weight_loss_stories: Schema.Attribute.Relation<
      'oneToMany',
      'api::weight-loss-story.weight-loss-story'
    >;
    workout_logs: Schema.Attribute.Relation<
      'oneToMany',
      'api::workout-log.workout-log'
    >;
    workouts: Schema.Attribute.Relation<'oneToMany', 'api::workout.workout'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::badge.badge': ApiBadgeBadge;
      'api::blog.blog': ApiBlogBlog;
      'api::challenge.challenge': ApiChallengeChallenge;
      'api::cheer.cheer': ApiCheerCheer;
      'api::coach.coach': ApiCoachCoach;
      'api::comment.comment': ApiCommentComment;
      'api::daily-quest.daily-quest': ApiDailyQuestDailyQuest;
      'api::desi-message.desi-message': ApiDesiMessageDesiMessage;
      'api::diet-component.diet-component': ApiDietComponentDietComponent;
      'api::diet-log.diet-log': ApiDietLogDietLog;
      'api::diet-plan.diet-plan': ApiDietPlanDietPlan;
      'api::diet-template.diet-template': ApiDietTemplateDietTemplate;
      'api::dietician.dietician': ApiDieticianDietician;
      'api::equipment.equipment': ApiEquipmentEquipment;
      'api::exercise.exercise': ApiExerciseExercise;
      'api::fitcoin-log.fitcoin-log': ApiFitcoinLogFitcoinLog;
      'api::forum.forum': ApiForumForum;
      'api::friend.friend': ApiFriendFriend;
      'api::health-log.health-log': ApiHealthLogHealthLog;
      'api::health-vital.health-vital': ApiHealthVitalHealthVital;
      'api::invitation.invitation': ApiInvitationInvitation;
      'api::meal-feedback.meal-feedback': ApiMealFeedbackMealFeedback;
      'api::meal.meal': ApiMealMeal;
      'api::mini-forum.mini-forum': ApiMiniForumMiniForum;
      'api::pack.pack': ApiPackPack;
      'api::period-symptom.period-symptom': ApiPeriodSymptomPeriodSymptom;
      'api::period.period': ApiPeriodPeriod;
      'api::post.post': ApiPostPost;
      'api::sleeplog.sleeplog': ApiSleeplogSleeplog;
      'api::social-relationship.social-relationship': ApiSocialRelationshipSocialRelationship;
      'api::step-session.step-session': ApiStepSessionStepSession;
      'api::thread.thread': ApiThreadThread;
      'api::waitlist.waitlist': ApiWaitlistWaitlist;
      'api::weight-loss-story.weight-loss-story': ApiWeightLossStoryWeightLossStory;
      'api::workout-log.workout-log': ApiWorkoutLogWorkoutLog;
      'api::workout.workout': ApiWorkoutWorkout;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
