template <typename T>
static void fizzbuzz(std::ostream& out, const T& number, const std::vector<std::pair<std::string, T>>& values)
{
    bool found = false;
 
    std::for_each(values.begin(), values.end(),
        [&](decltype(*values.begin()) i)
        {
            if (0 == number % i.second)
            {
                out << i.first.c_str();
                found = true;
            }        
        }
    );
 
    if (!found)
    {
        out << number;
    }
}