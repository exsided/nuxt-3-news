<template>
	<div class="post-card">
		<NuxtLink
			:to="link"
			class="post-card__picture"
		>
			<img :src="picture">
		</NuxtLink>
		<NuxtLink
			:to="link"
			:title="title"
			class="post-card__title"
		>
			{{ title }}
		</NuxtLink>
		<p
			v-if="date"
			class="post-card__date"
		>
			{{ dateFromatter(date) }}
		</p>
		<p
			v-if="description"
			:title="description"
			class="post-card__desc"
		>
			{{ description }}
		</p>
		<NuxtLink
			:to="link"
			class="post-card__read g-link"
		>
			читать подробнее
		</NuxtLink>
	</div>
</template>

<script setup>
const props = defineProps({
	id:
		{
			type: Number,
			default: 0,
		},
	title:
		{
			type: String,
			default: 'Пост',
		},
	picture:
		{
			type: String,
			default: '',
		},
	description:
		{
			type: String,
			default: '',
		},
	date:
		{
			type: String,
			default: '',
		}
});

const link = computed(() => `/posts-${props.id}`);
</script>

<style lang="scss">
	.post-card
	{
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 10px 10px 20px;
		transition: .4s ease;
		border-radius: 65px 0 5px 5px;

		&:hover
		{
			box-shadow: rgba(93, 95, 107, 0.1) 0px 0px 20px;
			transform: translateY(-5px);

			.post-card__read
			{
				opacity: 1;
				transform: translateY(-3px);
			}
		}
	}
	.post-card__title
	{
		display: -webkit-box;
		font-family: 'Ubuntu';
		font-weight: bold;
		color: $black;
		text-decoration: unset;
		font-size: 20px;
		line-height: 22px;
		transition: .2s ease;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		width: fit-content;
		margin-bottom: 15px;

		&:active { color: $blue; }

		@media (hover: hover)
		{
			&:hover
			{
				color: $blue;
			}
		}
	}
	.post-card__picture
	{
		display: block;
		margin-bottom: 10px;
		flex-grow: 1;

		img
		{
			object-fit: cover;
			width: 100%;
			height: 100%;
			border-radius: 55px 0;
		}
	}
	.post-card__date
	{
		font-size: 14px;
		line-height: 16px;
		color: $gray;
		margin: 0 0 10px;
	}
	.post-card__desc
	{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		font-style: italic;
		font-size: 18px;
		line-height: 20px;
		font-weight: normal;
		margin: 0 0 20px;
	}
	.post-card__read
	{
		position: absolute;
		opacity: 0;
		bottom: 10px;
		left: 10px;
		transform: translateY(3px);
	}
</style>
