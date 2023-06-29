import * as Form from '@radix-ui/react-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import Box from './component/Box';

type FormField = {
  topLeft: number;
  topRight: number;
  botLeft: number;
  botRight: number;
};

function App() {
  const [form, setForm] = useState<FormField>({
    topLeft: 0,
    topRight: 0,
    botLeft: 0,
    botRight: 0,
  });
  const { handleSubmit, register } = useForm<FormField>({
    defaultValues: {
      topLeft: 0,
      topRight: 0,
      botLeft: 0,
      botRight: 0,
    },
  });
  const onSubmit = handleSubmit((val) => {
    setForm(() => ({ ...val }));
  });

  return (
    <main className="container mx-auto h-full">
      <div className="grid grid-cols-2 place-items-center h-full">
        <Form.Root onSubmit={onSubmit} className="flex flex-col gap-y-2 max-w-md w-full">
          <Form.Field name="top_left" className="flex flex-row justify-between items-center gap-2">
            <Form.Label>Top Left</Form.Label>
            <Form.Control asChild>
              <input type="number" {...register('topLeft', { valueAsNumber: true })} />
            </Form.Control>
          </Form.Field>
          <Form.Field name="top_right" className="flex flex-row justify-between items-center gap-2">
            <Form.Label>Top Right</Form.Label>
            <Form.Control asChild>
              <input type="number" {...register('topRight', { valueAsNumber: true })} />
            </Form.Control>
          </Form.Field>
          <Form.Field name="bot_left" className="flex flex-row justify-between items-center gap-2">
            <Form.Label>Bottom Left</Form.Label>
            <Form.Control asChild>
              <input type="number" {...register('botLeft', { valueAsNumber: true })} />
            </Form.Control>
          </Form.Field>
          <Form.Field name="bot_right" className="flex flex-row justify-between items-center gap-2">
            <Form.Label>Bottom Right</Form.Label>
            <Form.Control asChild>
              <input type="number" {...register('botRight', { valueAsNumber: true })} />
            </Form.Control>
          </Form.Field>
          <Form.Submit className="rounded bg-blue-500 px-4 py-2 active:bg-blue-600 text-slate-100 uppercase">
            Submit
          </Form.Submit>
        </Form.Root>
        <Box tl={form.topLeft} tr={form.topRight} bl={form.botLeft} br={form.botRight} />
      </div>
    </main>
  );
}

export default App;
