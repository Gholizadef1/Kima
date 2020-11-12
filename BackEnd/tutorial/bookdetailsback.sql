PGDMP         -            
    x            hope %   10.14 (Ubuntu 10.14-0ubuntu0.18.04.1) %   10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16564    hope    DATABASE     v   CREATE DATABASE hope WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE hope;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    13039    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16596 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         postgres    false    3            �            1259    16594    auth_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public       postgres    false    3    203                       0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
            public       postgres    false    202            �            1259    16606    auth_group_permissions    TABLE     �   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         postgres    false    3            �            1259    16604    auth_group_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public       postgres    false    205    3                       0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
            public       postgres    false    204            �            1259    16588    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
 #   DROP TABLE public.auth_permission;
       public         postgres    false    3            �            1259    16586    auth_permission_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public       postgres    false    201    3                       0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
            public       postgres    false    200            �            1259    16614 	   auth_user    TABLE     �  CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);
    DROP TABLE public.auth_user;
       public         postgres    false    3            �            1259    16624    auth_user_groups    TABLE        CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
 $   DROP TABLE public.auth_user_groups;
       public         postgres    false    3            �            1259    16622    auth_user_groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public       postgres    false    3    209                       0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
            public       postgres    false    208            �            1259    16612    auth_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public       postgres    false    207    3                       0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
            public       postgres    false    206            �            1259    16632    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         postgres    false    3            �            1259    16630 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public       postgres    false    3    211                       0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
            public       postgres    false    210            �            1259    16759    authtoken_token    TABLE     �   CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);
 #   DROP TABLE public.authtoken_token;
       public         postgres    false    3            �            1259    16692    django_admin_log    TABLE     �  CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);
 $   DROP TABLE public.django_admin_log;
       public         postgres    false    3            �            1259    16690    django_admin_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public       postgres    false    213    3                       0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
            public       postgres    false    212            �            1259    16578    django_content_type    TABLE     �   CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         postgres    false    3            �            1259    16576    django_content_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public       postgres    false    3    199                       0    0    django_content_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
            public       postgres    false    198            �            1259    16567    django_migrations    TABLE     �   CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         postgres    false    3            �            1259    16565    django_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.django_migrations_id_seq;
       public       postgres    false    197    3                       0    0    django_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
            public       postgres    false    196            �            1259    16734    django_session    TABLE     �   CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         postgres    false    3            �            1259    16725 	   kyma_book    TABLE     *  CREATE TABLE public.kyma_book (
    id integer NOT NULL,
    title text,
    imgurl character varying(255),
    smallimgurl character varying(255),
    numpages integer,
    formatbook text,
    publisher text,
    avgrating integer,
    ratecount integer,
    author text,
    description text
);
    DROP TABLE public.kyma_book;
       public         postgres    false    3            �            1259    16723    kyma_book_id_seq    SEQUENCE     �   CREATE SEQUENCE public.kyma_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.kyma_book_id_seq;
       public       postgres    false    215    3                       0    0    kyma_book_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.kyma_book_id_seq OWNED BY public.kyma_book.id;
            public       postgres    false    214            �            1259    16747    quickstart_account    TABLE     p  CREATE TABLE public.quickstart_account (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    email character varying(60) NOT NULL,
    username character varying(30) NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    last_login timestamp with time zone NOT NULL,
    is_staff boolean NOT NULL,
    is_superuser boolean NOT NULL
);
 &   DROP TABLE public.quickstart_account;
       public         postgres    false    3            �            1259    16745    quickstart_account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.quickstart_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.quickstart_account_id_seq;
       public       postgres    false    3    218                        0    0    quickstart_account_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.quickstart_account_id_seq OWNED BY public.quickstart_account.id;
            public       postgres    false    217            ,           2604    16599    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    203    202    203            -           2604    16609    auth_group_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    205    204    205            +           2604    16591    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    201    200    201            .           2604    16617    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    206    207    207            /           2604    16627    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    208    209    209            0           2604    16635    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    211    210    211            1           2604    16695    django_admin_log id    DEFAULT     z   ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    212    213    213            *           2604    16581    django_content_type id    DEFAULT     �   ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            )           2604    16570    django_migrations id    DEFAULT     |   ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
 C   ALTER TABLE public.django_migrations ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196    197            3           2604    16728    kyma_book id    DEFAULT     l   ALTER TABLE ONLY public.kyma_book ALTER COLUMN id SET DEFAULT nextval('public.kyma_book_id_seq'::regclass);
 ;   ALTER TABLE public.kyma_book ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    215    214    215            4           2604    16750    quickstart_account id    DEFAULT     ~   ALTER TABLE ONLY public.quickstart_account ALTER COLUMN id SET DEFAULT nextval('public.quickstart_account_id_seq'::regclass);
 D   ALTER TABLE public.quickstart_account ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    217    218    218            �          0    16596 
   auth_group 
   TABLE DATA               .   COPY public.auth_group (id, name) FROM stdin;
    public       postgres    false    203   �       �          0    16606    auth_group_permissions 
   TABLE DATA               M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public       postgres    false    205   0�       �          0    16588    auth_permission 
   TABLE DATA               N   COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
    public       postgres    false    201   M�                 0    16614 	   auth_user 
   TABLE DATA               �   COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
    public       postgres    false    207   �                 0    16624    auth_user_groups 
   TABLE DATA               A   COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
    public       postgres    false    209   ��                 0    16632    auth_user_user_permissions 
   TABLE DATA               P   COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public       postgres    false    211   ¦                 0    16759    authtoken_token 
   TABLE DATA               @   COPY public.authtoken_token (key, created, user_id) FROM stdin;
    public       postgres    false    219   ߦ                 0    16692    django_admin_log 
   TABLE DATA               �   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public       postgres    false    213   ��       �          0    16578    django_content_type 
   TABLE DATA               C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public       postgres    false    199   �       �          0    16567    django_migrations 
   TABLE DATA               C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public       postgres    false    197   ��       
          0    16734    django_session 
   TABLE DATA               P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public       postgres    false    216   $�       	          0    16725 	   kyma_book 
   TABLE DATA               �   COPY public.kyma_book (id, title, imgurl, smallimgurl, numpages, formatbook, publisher, avgrating, ratecount, author, description) FROM stdin;
    public       postgres    false    215   ?�                 0    16747    quickstart_account 
   TABLE DATA               |   COPY public.quickstart_account (id, password, email, username, date_joined, last_login, is_staff, is_superuser) FROM stdin;
    public       postgres    false    218   ��       !           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
            public       postgres    false    202            "           0    0    auth_group_permissions_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);
            public       postgres    false    204            #           0    0    auth_permission_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.auth_permission_id_seq', 40, true);
            public       postgres    false    200            $           0    0    auth_user_groups_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
            public       postgres    false    208            %           0    0    auth_user_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);
            public       postgres    false    206            &           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);
            public       postgres    false    210            '           0    0    django_admin_log_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);
            public       postgres    false    212            (           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 10, true);
            public       postgres    false    198            )           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 29, true);
            public       postgres    false    196            *           0    0    kyma_book_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.kyma_book_id_seq', 24, true);
            public       postgres    false    214            +           0    0    quickstart_account_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.quickstart_account_id_seq', 1, false);
            public       postgres    false    217            B           2606    16721    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public         postgres    false    203            G           2606    16648 R   auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
 |   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
       public         postgres    false    205    205            J           2606    16611 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public         postgres    false    205            D           2606    16601    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public         postgres    false    203            =           2606    16639 F   auth_permission auth_permission_content_type_id_codename_01ab375a_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
 p   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
       public         postgres    false    201    201            ?           2606    16593 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public         postgres    false    201            R           2606    16629 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public         postgres    false    209            U           2606    16663 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public         postgres    false    209    209            L           2606    16619    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public         postgres    false    207            X           2606    16637 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public         postgres    false    211            [           2606    16677 Y   auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
       public         postgres    false    211    211            O           2606    16715     auth_user auth_user_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public         postgres    false    207            p           2606    16763 $   authtoken_token authtoken_token_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);
 N   ALTER TABLE ONLY public.authtoken_token DROP CONSTRAINT authtoken_token_pkey;
       public         postgres    false    219            r           2606    16765 +   authtoken_token authtoken_token_user_id_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);
 U   ALTER TABLE ONLY public.authtoken_token DROP CONSTRAINT authtoken_token_user_id_key;
       public         postgres    false    219            ^           2606    16701 &   django_admin_log django_admin_log_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public         postgres    false    213            8           2606    16585 E   django_content_type django_content_type_app_label_model_76bd3d3b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
 o   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
       public         postgres    false    199    199            :           2606    16583 ,   django_content_type django_content_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public         postgres    false    199            6           2606    16575 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public         postgres    false    197            d           2606    16741 "   django_session django_session_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public         postgres    false    216            a           2606    16733    kyma_book kyma_book_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.kyma_book
    ADD CONSTRAINT kyma_book_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.kyma_book DROP CONSTRAINT kyma_book_pkey;
       public         postgres    false    215            h           2606    16754 /   quickstart_account quickstart_account_email_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.quickstart_account
    ADD CONSTRAINT quickstart_account_email_key UNIQUE (email);
 Y   ALTER TABLE ONLY public.quickstart_account DROP CONSTRAINT quickstart_account_email_key;
       public         postgres    false    218            j           2606    16752 *   quickstart_account quickstart_account_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.quickstart_account
    ADD CONSTRAINT quickstart_account_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.quickstart_account DROP CONSTRAINT quickstart_account_pkey;
       public         postgres    false    218            m           2606    16756 2   quickstart_account quickstart_account_username_key 
   CONSTRAINT     q   ALTER TABLE ONLY public.quickstart_account
    ADD CONSTRAINT quickstart_account_username_key UNIQUE (username);
 \   ALTER TABLE ONLY public.quickstart_account DROP CONSTRAINT quickstart_account_username_key;
       public         postgres    false    218            @           1259    16722    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public         postgres    false    203            E           1259    16659 (   auth_group_permissions_group_id_b120cbf9    INDEX     o   CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
 <   DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
       public         postgres    false    205            H           1259    16660 -   auth_group_permissions_permission_id_84c5c92e    INDEX     y   CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
 A   DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
       public         postgres    false    205            ;           1259    16645 (   auth_permission_content_type_id_2f476e4b    INDEX     o   CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
 <   DROP INDEX public.auth_permission_content_type_id_2f476e4b;
       public         postgres    false    201            P           1259    16675 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public         postgres    false    209            S           1259    16674 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public         postgres    false    209            V           1259    16689 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     �   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public         postgres    false    211            Y           1259    16688 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public         postgres    false    211            M           1259    16716     auth_user_username_6821ab7c_like    INDEX     n   CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
 4   DROP INDEX public.auth_user_username_6821ab7c_like;
       public         postgres    false    207            n           1259    16771 !   authtoken_token_key_10f0b77e_like    INDEX     p   CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);
 5   DROP INDEX public.authtoken_token_key_10f0b77e_like;
       public         postgres    false    219            \           1259    16712 )   django_admin_log_content_type_id_c4bce8eb    INDEX     q   CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
 =   DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
       public         postgres    false    213            _           1259    16713 !   django_admin_log_user_id_c564eba6    INDEX     a   CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
 5   DROP INDEX public.django_admin_log_user_id_c564eba6;
       public         postgres    false    213            b           1259    16743 #   django_session_expire_date_a5c62663    INDEX     e   CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
 7   DROP INDEX public.django_session_expire_date_a5c62663;
       public         postgres    false    216            e           1259    16742 (   django_session_session_key_c0390e0f_like    INDEX     ~   CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
 <   DROP INDEX public.django_session_session_key_c0390e0f_like;
       public         postgres    false    216            f           1259    16757 &   quickstart_account_email_7eaab422_like    INDEX     z   CREATE INDEX quickstart_account_email_7eaab422_like ON public.quickstart_account USING btree (email varchar_pattern_ops);
 :   DROP INDEX public.quickstart_account_email_7eaab422_like;
       public         postgres    false    218            k           1259    16758 )   quickstart_account_username_2644f280_like    INDEX     �   CREATE INDEX quickstart_account_username_2644f280_like ON public.quickstart_account USING btree (username varchar_pattern_ops);
 =   DROP INDEX public.quickstart_account_username_2644f280_like;
       public         postgres    false    218            u           2606    16654 O   auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
       public       postgres    false    205    2879    201            t           2606    16649 P   auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
       public       postgres    false    203    2884    205            s           2606    16640 E   auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
       public       postgres    false    199    201    2874            w           2606    16669 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public       postgres    false    203    209    2884            v           2606    16664 B   auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
       public       postgres    false    209    207    2892            y           2606    16683 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public       postgres    false    211    201    2879            x           2606    16678 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public       postgres    false    2892    207    211            |           2606    16772 I   authtoken_token authtoken_token_user_id_35299eff_fk_quickstart_account_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_quickstart_account_id FOREIGN KEY (user_id) REFERENCES public.quickstart_account(id) DEFERRABLE INITIALLY DEFERRED;
 s   ALTER TABLE ONLY public.authtoken_token DROP CONSTRAINT authtoken_token_user_id_35299eff_fk_quickstart_account_id;
       public       postgres    false    218    219    2922            z           2606    16702 G   django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
       public       postgres    false    2874    213    199            {           2606    16707 B   django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id;
       public       postgres    false    207    2892    213            �      x������ � �      �      x������ � �      �   �  x�]�Kn�@D�3����o�+d)"x�Xv8�o�)���tד�I��k���T�ҹ��4<\p��1�4��������Py%`E�)��d���&���,ڲY���8^R�JR���i9�N�{�gX*� ��$G���<�{�*��-����ӊ@H)*+@�+6��qp5	,Oj})�g`������6b:��=_nS7�_��}t[2�j��p�"O0��^O<�4_nD�&]��c��;��K�wa�ɘi�`�cLu] �bD������Igy���)D2`: 
PEFL�s(�m�6ݻ��8&_��L��c���#��t��;�ϴ�}e���pb�"� �:��XZM7��Y����?g�̔hz̠��`�
̘He���{���         �   x�]��
�@F�3O��w�N:BP�E�02�"S+�1��OZ�<�q��Hi�+����TC6 MoY7�wx�-�[�ĭ� מG��z�6�.Ƀ�!rf�``����s�n
���p�@d�VM�)o�a�\���&��5s%����=�ll=�dRJ�}1&            x������ � �            x������ � �            x������ � �            x������ � �      �      x�]�K
1D�]�ǿwqcCLwLw��^� ��������-G��́�vl�5�S	5G�(��B�*�`����bO^�>���w�@��߂#��]EN�l�'5W�����p�&)0�Ĵ�G�ʫ��t�?�      �   l  x����n�0���S�͌�y��,\6j����k;�7�|�g��V�q��0ϧ��* @��ܺ�" xGx'���А���;�U�8�}�PBP&X�v};<G4rL� d�q'|?~y�����$dr���]��n;��`?:��ۿc��	��8&�K���~�9?��\��UVI�J~d]7�`>��4��o{�m;?��[�*�\'�.&v6���{�vO%q��%�)~mI���0?H� QN�8ĵ�sӜ�occ�n}��ł�"c���m(���m��DKi��=չ�/׵;7�a���!���~�����*����^M�Ĭ1�s�ȋ����%�5���G�pV��x<��Le�,��C���C�OW�A>R��G�nF���������]}�z���0:F� �����0�T�AY���$��@�ƾ��6��Q��f��&�B�{Z���!k&bb��{X���cՍ�Z�f2�xb��h�w��UF�2p��m3������"-�5'$̻.��v�����:>UzY[V�@o?�مymV1Z|#+n�EИ���в���ӯ���qqH\fN�r��8�xmYT\�*�k_e��U0���3��"Sy�?�f��\'�      
     x��Yr�0  ��r�^ '!a��
�PAA2�ɰ����E
��������ۢ���q9�^5�ȕ��c�w�ԝy	��䑩�Ռ(+8y��fѾ;��[M�P&�t;�J�d������<��W���� H��5!a��hVÊl�H\��`�N�w����o�W�5s�n<=G7w�󥵂�KX��ܳn�})���������J�9��o�M�4���Vn#QA�֠��oq�x��~H@"�"�>2dl y�c!$M��	���A^�      	      x��\Ko#Wv^S���y 1��J��䱉ad� 	�j�[c�ԡd{���0���ʀ��d�%�P�ܭ��Ej�_��}��[�(��	$ 	3pKd�}�{��ι��4Ώ�y?ޜD�d>H'�'��7�׷��;�������{O׷��o���b]~y�ْ/�=�;�+>��{��j?����}���J�f��h�w�+�r�Ҭ�����?���,�������5�%��
ﵟmu�7?,��ܜ�	���
�B��^Ϗ�I�m:���yW$1�-�L�iRX<OG�D>���H�7)E��e$���}����ؼ������Ѽ͏��H&��r�1.0=~����;D�7�T��R�0=��{>��&����90��b�y>�z���'��'���+y�
��/���n��Ҥ��N(�������Ky����K�Sz�� ��6��G~k��j��.g��H���L՗�Sya���|Qz6?�c<�zL���u"K�w��6%;��2d�{�m�:�#�Wg�]��'��E�I���� X+��ȋ	F�$1>֊�b�*�7\#_�E8��`9�K;�;S�f��j�qMԼ\kĥZ�>�i�,���R.�Bc�- �~�R��3Q{��Vr0bM���n��g�d����N���"�c9�>�e8?�9���HM�uJ�cK�A9p��N�Z�Ȭ�Å��#f����1t�p���,���MO�TVxW����V�UGT�Ƶj�q/'�zwB�Fp@1IHTkDH��)�0��C�ǋ�*������+B��א�Lނ�@�1
���x���@޻��D��^ʼ"ls;=���A� Ć����#���ʉNhw����iӯ��s\�x!k�g/���s؛�E����f���_��9�,�RxY�ڹ�b��sq�wBuT�T&�B�E_$��$�����f��-��ݨ���]~2�窒, �X�VL��s��d�,����ܮ�����8��sc��4	�l��h>��..��G�?�G���=F8���C�4O'����KSF`	�y������N��M������ǂ��K�1~A(���?q>h�\�"|֑E�V{���� m@��h��Z�-@{���� ��+@k
@�Q'玻���S�O��������G'B�����j󝇛��j���l��rk3~To�����4J�v�R|����V�u��N�?��\m��v3n��6����fy��nT9l+�a�Ƈ♪Ղ�. �z?�H-���k���xO ��y� 3<�N���.6$�5k��ժV��hW���x3��ԗ>�X�!�B@�>��B�'~�~4s%R�1�3&�I��ĉ���,�+@'��a׆�? �%(�e�L3�M/�=9fg���	"�w��5�%c!V/͊�~��>����׊/����{��U�}�ΖE��/ܒ�Z�^�b���wf"�ŋ�y�j�nj���Fi���*��0m���C�H]����w9��.W	d�E�0�E��v3y��-�D�i�&��2��p�+s��c��0���D$>�h�B�R�t��FO|�,8YZ��Ql��(� <J@�3q3e��pO��K�N�&��7� 
�A>rq��,劑��Y9J�"��m2�SG ��e=�� =�� ����:���l 7~nkSwh�2�)������S�nDD�T��TQ^"41	�m3��{Ǫh�X��T^��
'+`G�+O�`���ӳC_��\�L_a��lmB�>̀��QGy�gy���j\.7[�Vyg��*�$I���r�h�ʥ�߶;�6�>���P�E'$v����$��R���胼Ph�� ZF�3)g6�9�˺de3C�vd��ԋyn���QƅhD���4��g���ŴA'w����ı��&./����S�&X���-a?ͫϵL�B��B�~�L�0R���WV�=TX�n�?/�`�CA?���oȠ��+����Ļ�Sh���O嗀�\�2�D��L��Q�Q!�+y�0$ul.��z^ $tz��18><�Y�!/T`?�е�T�[P'�}�ݡ��`�f��Tn5K�F[9�'C*qH�����Lq�LL{���x�|�DTs<
�qx�0�zMLgE2Z�Cr]���N��� |�g�h@�O�:����n��f��暗��Sk^/ J�2r�����)[�(��w �}0�]�G���q��"�4��1<N�Ng�×�-o�?�1���T��5�|-o�+�T�T^�!w����8���ð�} ��+F�w��H��̖m���+ڿ�q��Y�L-��_ʁ�&����x�,?�:l��� I jb"�.}u�L/q{��n�E���$�DV�$  ��1�J`x�����먏LލJ�Ǎ���M"�ja^z
����f<&�̌ .L���j�"���@�"J6v�~A
�}�����n����p������3[N~����|��s�E "�͈e��=Mff�v�?��0���#QeMܩ�����:�-����q�$P*�+�R�Ҩ�r[5��n�f����(�]�{������+�)�	���|,d٥�Ah>p{��2�(D�P��x�|qJ�P�K7�ħ�c:(����q9²�����	���`��wGٴZ�Z�dJ܌��rh`�$�K<�+�j��xk�jAc�CX�`Nax�Ǟf��O��x�rwJ}#��	�4-�����ܡ�D��iL'h�����ī��#��"�ĕf/C��%����p��y�˖�3�0���F�j4[�j]dڪb�j�o����9���"��R�o�:��bL>�RM�����GH���V){���̾*�����}�.��mn�\���C[��bp�D}̝8è�3kq���Jq�mh����l�p��#�fi�l�Zo�J����j��,5��bi�gq�V�VCrt�h��<�"8���C���Θ�"�Bb�f���jL�g�R*ؚEJΰ��i�Ư-!%��/QU�VN	3���ah�1oV�\W��,&&
�d.��ĸYɁ�;@GW�qV�m��Hzi�X�����-4_k}��Y߉��|wA:��iu6�W��|,�̵�a�L�,_� 3�`Y��,>�?;�����~�y�h�\� �Y��u��7�m�YsFOy�e�Sc���AX��8 ��J�����FJ�ё���O]h>��&�q�3�,|��E��&*؁�l��$��� �t�J���,�8�q�=��0������?�)s8�iU��g(}�娂^`ۗw����j��l���JC��F�z^h�,�5��Y�B-.�Q��|e>ȯ�	ɳ��=h74w3b���VD���Y=0����p*�I�͓H�$���ʫ3x��@����hd��>3uT>��}FP	�S_��4�s����!�EP���pe��q�Z{����\������OW����s�(���p(���ʔ"w8�m��6��
�@��/�5�����h��oĉ�ꅙ��I~x���f�"��ݙE�^i���
�R=���Ch�,Y�]� t���aZ�B9[�n�ҙj�"���������qe?nO�ܡ/0��,��p���n)�R��ϒ�ł66��sGz��]
� �p���<�_��R%m�&�`GF��-���JPM��� ��R��L�c@�A� kٞV�.|&I����VW!v������O������k�V޴_B�YZM�6}��Ι	�9���.��L^_��5�}��4��ofq �^���ngàp;4Gx�S	��wa�9�ܮ[Xܧpq�����j^C�G��Kj�,o��$i3ʎ͈���eP�7!��9e�*��o5��t2��	�#M�RM�i��r���P�%�<�<��2v����j
��;2�s������r8P_W�����v��XK9��ؽ��2f�/�k���ȑ�!��o���ll�%dF��_�R``	�f�ӹ\#a���RYˢǂ��Z �1�S��ǹJ���>�n�ob�;p,���:7�,��aa�'��\)����
� �  1���E�<FDS(^2�[,J��q{?j�>����t{��\OT-n�ܿ�@���Ý��'[�}tm6[��n���~�h{7�������67�G����\�ɯ{�[������蓽�Σ?ޏK�>�vd�h�`����_���O��|����A�����N��L��ލ:{Oۻ�[}��>8�ڍn|�%�ƥZ�r�j�L�y���8��������YFg�i��a����a�D&���DƑA�?^��4:�w�w�[�d���Hv����Ǌ��������
�:ۛ�h�_?������{�vj����������W���do�݉~���a�������,�B�~����Z����K�V��UK�z�&:w�l�,�U��\�6����P$+K�rJ�?�Ջ��-i�H
��ך������@?ы��p�<g��r�a�l�p�;��D��K��C�+�)��JW��$(@%=���+��G�3��9W����FZ�1X7�����Ȟ`��IB��KT�����G�Y���&W{U܄Ԁ�q��e-�0������m�@c�6�i�}J�RS2�*���W�,��zՄm���02H�	���F���?�V��h~@�}������Rk���t�w �-< f���C�H�ٞ#��S:�����8��_�z�t_�bp��x�.��0��!.,�T��==�R�l��q$��r�DKr,'bM"\�H�K-�Y��-�~ѕ�� ���]Ķⱁ�%��|Vu��8������
G3T����9v:3$441Z������#3M"bX�[L��<b�zA��
�M���J�R��G��fq\yWV�)س�`L���a!Cc�u�M~��G���%�%����M�ĺ�;���,k�D1+��"��A���kbLk�RA��Fs_;f���m�Z�Q^o����[��rE�*h�Y��K���Y|�Q+$���<�DЮ����i;zo��o�GYc�w/��r��U�7B��]��x=��^����x5N��!�����i?���j�� �$�e)d֓�Fo�49C��h<|��d��!ٴ�Or_�}�z�C-�&&Xmg�%3�s���F�-�8�?5���<��_+K�+W��c{a'��ÏҖ���Q,�`?u\|!4��?��v&J�ز�v���]��>u��o����U�߉>z��Mo�� ��#��������fB�J�؇��o��v�Ե���^7m�>S�k�c�m?�ځ�W2���Ӿ�w�,�u�~"B���#CӀ3b���kB0\�5\�n�Kc��Ŝ$
�UOf$+NXkt<b�K�Z�Z�L��F���htv�=Q��^�(FVЁ
�t�;����*�@������1�;U�W�@�V=�|yf%9�c�׆r� ]]�R;�CD�W�D�j$���>y��Gq(7�~1�.�Q���U�t3Ֆ� ���9�M�a).kηK9`�#�;����M�Rq�cC��v�"����V����w/\�Ah�KC3��$���q��w��N`lc�Z{��u�T�j�7$��S�����r�k�\&J6.�,��;�Ԟ\�T����o�B@��D>Ӳ�".�hD��%���W̧b����mT*[ki0lof	������1��<=�r^s���ڔo~`m	2�"G�Z�{�죆�����`��p�{*������2�4Z�Α�κA��0����ˉHN�+p=�����k �q��l�c��r�������j\����;��7��	����v�e�O�{4+�|v��#���c�A�|>X� ����Y��XG^�P��k`�����6�v�
<����v��A\�6�1//���u5���2���%`��|�;[{��9��ER��:����o���w�o7T�]�?��f��W���;J}��Ђ����Ӡi�d^Z\4�yT*�J\7}�Z����\y�f��oO��j.��,~�*�v�ϭ�] `���?�=ܫ�Ю{�o�*݌�2Q�	c.Y2�G#w���%䚖�[	��z�Ԕ+�������Ax�����?a�U��w��ۜ�g>ú(H�i�hB��5Pm�t]K������5�\�ط�n�>���[x�ZB���,�ZA�P/�_y�+��.���}�x&�h6�)<�16J���w�[1�T��$���֓����ӄ�#�B�3���G����zt<>*:Vӕ4A%�>��<qW1�F�SN�RK�8�\¡yS�Lb�#�kZ�u�iΈ͎��f��g���8���}�����[�Ǜ�VF�<P~N��B�_
XW��Yg��*s�ٝ�����I�%�ș����L�L$�x���9ت4���:�z���\���Wk�kgvR)�oq�<��2��|���
'��ks�u.���dl~ϙPn1���ʰs�-�0�ڜ5��c�B�=���S�$o7�F��ҕ�Z�Y�ke@�ZC~��R��Y<]�*��+���ePUv��|���k�J�<�,�O#᝸�kl�p-���^/7j�{IDV̑�����.M�x�\o�m?��D���~��t[D�0�ȱ����aJ�XG�w�#ߜ�=@��i��g�#���聡�ipa��F*�B]����Df���
��A��>�?�`*Ml���F���/��;a�&`��)��%���1g�i�k$���H��Y��^�t���d���{��v��h(O�_:b�?�ZOԵ����@K��l�6��/������ϛ]3�z��N�1�Yl_���9��xh`�eE6tt}%��]Կ�a���V�X�'������J��"Y�a��n��lJB��[>Wx�YU��h9(�E6|�<y_՟P���Oʳ@9�����߮=��wM*�8���|�!�g�ςt��/�5�xZ����Z�t��f��R\}���2na\1>2��J0�� ������"��            x������ � �     