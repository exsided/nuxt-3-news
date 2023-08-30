<template>
	<label
		:class="{
			'ui-input--error': error,
			'ui-input--with-label': label,
			'ui-input--textarea': textarea,
			'ui-input--label-on-top': label && modelValue || label && placeholder,
		}"
		class="ui-input"
	>
		<textarea
			v-if="textarea"
			:value="modelValue"
			:placeholder="placeholder"
			:class="{'ui-input__field--textarea': textarea}"
			class="ui-input__field"
			@input="onInput($event.target.value)"
		/>
		<input
			v-else
			:name="name"
			:placeholder="placeholder"
			:value="modelValue"
			class="ui-input__field"
			@input="onInput($event.target.value)"
		>
		<span v-if="label" class="ui-input__label">
			{{ label }}
		</span>
		<div v-if="error && errorText" class="ui-input__error">
			<span>
				{{ errorText }}
			</span>
		</div>
	</label>
</template>

<script setup>
const props = defineProps({
	name:
	{
		type: String,
		default: '',
	},
	modelValue:
	{
		type: String,
		default: '',
	},
	placeholder:
	{
		type: String,
		default: '',
	},
	error:
	{
		type: Boolean,
		default: false
	},
	errorText:
	{
		type: String,
		default: '',
	},
	label:
	{
		type: String,
		default: '',
	},
	textarea:
	{
		type: Boolean,
		default: false
	},
});

const emit = defineEmits(['update:model-value']);

const onInput = value => emit('update:model-value', value);
</script>

<style lang="scss">
	.ui-input
	{
		position: relative;
		display: block;
		margin-bottom: 6px;

		&--with-label
		{
			.ui-input__field { padding-top: 24px; }
		}

		&--error
		{
			animation: shake 0.2s ease-in-out 0s 2;

			.ui-input__field
			{
				border-color: $red;
				color: $red;

				&::placeholder { color: $red; }

				&:not(:disabled)
				{
					&:focus, &:hover { border-color: $red; }
				}
			}

			.ui-input__label { color: $red; }
		}
	}
	.ui-input__label
	{
		position: absolute;
		top: 23px;
		left: 20px;
		transform: translateY(-50%);
		font-size: 13px;
		line-height: 18px;
		color: rgba(44, 44, 44, 0.4);
		transition: .2s ease;
	}

	.ui-input__field:focus ~ .ui-input__label, .ui-input--label-on-top .ui-input__label
	{
		font-size: 11px;
		line-height: 14px;
		margin-top: -9px;
	}

	.ui-input__field
	{
		font-weight: 600;
		font-size: 13px;
		line-height: 14px;
		color: $black;
		height: 46px;
		padding: 14px 20px 14px 20px;
		border: unset;
		background-color: $lgray;
		border-radius: 10px;
		width: 100%;
		transition: .2s ease;
		box-sizing: border-box;
		border: 1px solid $lgray;

		&::placeholder
		{
			color: rgba(44, 44, 44, 0.4);
		}

		&:not(:disabled)
		{
			&:focus, &:hover
			{
				outline: unset;
				border-color: $blue;
			}
		}

		&--textarea
		{
			height: 110px;
			resize: none;
			padding-top: 20px;
		}
	}

	.ui-input__error
	{
		display: flex;
		padding-top: 2px;

		span
		{
			font-size: 9px;
			line-height: 10px;
			color: $red;
		}
	}
</style>
