import { useState } from 'react';
import { Box, Button, Flex, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Box p={8}>
      <Flex as="nav" justify="space-between" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} ml={2} colorScheme="blue">
            <FaPlus />
          </Button>
        </Flex>
        <List w="full">
          {tasks.map(task => (
            <ListItem key={task.id} p={2} bg={task.completed ? 'green.100' : 'gray.100'}>
              <Flex align="center" justify="space-between">
                <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
                <Flex>
                  <Button onClick={() => toggleComplete(task.id)} size="sm" colorScheme={task.completed ? 'pink' : 'green'} mr={2}>
                    <FaCheck />
                  </Button>
                  <Button onClick={() => deleteTask(task.id)} size="sm" colorScheme="red">
                    <FaTrash />
                  </Button>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Index;