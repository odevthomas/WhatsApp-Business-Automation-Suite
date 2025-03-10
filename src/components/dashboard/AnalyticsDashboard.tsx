import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Users,
  Clock,
  BarChart3,
  Calendar,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AnalyticsDashboard: React.FC = () => {
  // Sample data for charts
  const messageData = [
    { name: "Seg", recebidas: 40, respondidas: 35 },
    { name: "Ter", recebidas: 35, respondidas: 30 },
    { name: "Qua", recebidas: 50, respondidas: 45 },
    { name: "Qui", recebidas: 65, respondidas: 60 },
    { name: "Sex", recebidas: 55, respondidas: 50 },
    { name: "Sáb", recebidas: 30, respondidas: 25 },
    { name: "Dom", recebidas: 20, respondidas: 18 },
  ];

  const conversionData = [
    { name: "Seg", taxa: 25 },
    { name: "Ter", taxa: 30 },
    { name: "Qua", taxa: 22 },
    { name: "Qui", taxa: 35 },
    { name: "Sex", taxa: 40 },
    { name: "Sáb", taxa: 28 },
    { name: "Dom", taxa: 20 },
  ];

  const responseTimeData = [
    { name: "Seg", tempo: 5 },
    { name: "Ter", tempo: 7 },
    { name: "Qua", tempo: 4 },
    { name: "Qui", tempo: 3 },
    { name: "Sex", tempo: 6 },
    { name: "Sáb", tempo: 8 },
    { name: "Dom", tempo: 10 },
  ];

  const leadSourceData = [
    { name: "WhatsApp", value: 65 },
    { name: "Site", value: 20 },
    { name: "Indicação", value: 10 },
    { name: "Outros", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 bg-gray-50 h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Visão geral do seu atendimento</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            Últimos 7 dias <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Mensagens Recebidas
                </p>
                <h3 className="text-2xl font-bold mt-1">295</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">
                    12% vs semana anterior
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Taxa de Conversão
                </p>
                <h3 className="text-2xl font-bold mt-1">28.5%</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">
                    5% vs semana anterior
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Tempo Médio de Resposta
                </p>
                <h3 className="text-2xl font-bold mt-1">5.2 min</h3>
                <div className="flex items-center mt-1 text-red-600">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">
                    -8% vs semana anterior
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Novos Leads</p>
                <h3 className="text-2xl font-bold mt-1">42</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">
                    18% vs semana anterior
                  </span>
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Mensagens Recebidas vs Respondidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={messageData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRecebidas"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#0088FE"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorRespondidas"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#00C49F"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="recebidas"
                    stroke="#0088FE"
                    fillOpacity={1}
                    fill="url(#colorRecebidas)"
                  />
                  <Area
                    type="monotone"
                    dataKey="respondidas"
                    stroke="#00C49F"
                    fillOpacity={1}
                    fill="url(#colorRespondidas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Taxa de Conversão (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conversionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="taxa" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tempo Médio de Resposta (min)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={responseTimeData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorTempo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#FF8042"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="tempo"
                    stroke="#FF8042"
                    fillOpacity={1}
                    fill="url(#colorTempo)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Origem dos Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-md"
                >
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">
                      Reunião com Cliente {index + 1}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(
                        Date.now() + 86400000 * (index + 1),
                      ).toLocaleDateString()}{" "}
                      - 10:00 AM
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-xs ml-1">Cliente {index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver todos os agendamentos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
