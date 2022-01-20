export const schema = {
	models: {
		Post: {
			name: "Post",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				title: {
					name: "title",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				content: {
					name: "content",
					isArray: false,
					type: "String",
					isRequired: false,
					attributes: [],
				},
				bolgID: {
					name: "bolgID",
					isArray: false,
					type: "ID",
					isRequired: false,
					attributes: [],
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
			},
			syncable: true,
			pluralName: "Posts",
			attributes: [
				{
					type: "model",
					properties: {},
				},
				{
					type: "key",
					properties: {
						name: "byBlog",
						fields: ["bolgID"],
					},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "public",
								operations: ["read"],
							},
							{
								allow: "private",
								operations: ["create", "read"],
							},
							{
								provider: "userPools",
								ownerField: "owner",
								allow: "owner",
								identityClaim: "cognito:username",
								operations: [
									"create",
									"update",
									"delete",
									"read",
								],
							},
						],
					},
				},
			],
		},
		Blog: {
			name: "Blog",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				name: {
					name: "name",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				Posts: {
					name: "Posts",
					isArray: true,
					type: {
						model: "Post",
					},
					isRequired: false,
					attributes: [],
					isArrayNullable: true,
					association: {
						connectionType: "HAS_MANY",
						associatedWith: "bolgID",
					},
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
			},
			syncable: true,
			pluralName: "Blogs",
			attributes: [
				{
					type: "model",
					properties: {},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "public",
								operations: ["read"],
							},
							{
								groupClaim: "cognito:groups",
								provider: "userPools",
								allow: "groups",
								groups: ["admin"],
								operations: [
									"read",
									"create",
									"update",
									"delete",
								],
							},
						],
					},
				},
			],
		},
	},
	enums: {},
	nonModels: {},
	version: "b201d570f8773dc4d3bf051331503b81",
};
